import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface Question {
  id: string
  type: 'scale' | 'choice'
  question: string
  min?: number
  max?: number
  labels?: Record<number, string>
  options?: string[]
}

interface Props {
  lessonSlug: string
  sessionId: string
  questions: Question[]
}

export function LiveStartResults({ lessonSlug, sessionId, questions }: Props) {
  const [responses, setResponses] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    // Load existing
    supabase
      .from('survey_responses')
      .select('payload')
      .eq('lesson_slug', lessonSlug)
      .eq('session_id', sessionId)
      .eq('survey_type', 'start')
      .then(({ data }) => {
        if (data) setResponses(data.map((r) => r.payload as Record<string, unknown>))
      })

    // Realtime subscription
    const channel = supabase
      .channel(`live-start-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'survey_responses',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const row = payload.new as { survey_type: string; payload: Record<string, unknown> }
          if (row.survey_type === 'start') {
            setResponses((prev) => [...prev, row.payload])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [lessonSlug, sessionId])

  const total = responses.length

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold text-foreground">Wyniki na żywo</h3>
        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {total} {total === 1 ? 'odpowiedź' : total < 5 ? 'odpowiedzi' : 'odpowiedzi'}
        </span>
      </div>

      {total === 0 ? (
        <p className="text-muted-foreground text-center py-8">Czekam na odpowiedzi...</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium text-foreground text-sm md:text-base">{q.question}</p>
            {q.type === 'scale' && <ScaleChart question={q} responses={responses} />}
            {q.type === 'choice' && <ChoiceChart question={q} responses={responses} />}
          </div>
        ))
      )}
    </div>
  )
}

function ScaleChart({ question, responses }: { question: Question; responses: Record<string, unknown>[] }) {
  const counts: Record<number, number> = {}
  for (let i = question.min!; i <= question.max!; i++) counts[i] = 0
  responses.forEach((r) => {
    const v = Number(r[question.id])
    if (v >= question.min! && v <= question.max!) counts[v]++
  })
  const maxCount = Math.max(...Object.values(counts), 1)

  return (
    <div className="flex items-end gap-2 h-32">
      {Object.entries(counts).map(([val, count]) => (
        <div key={val} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs font-bold text-foreground">{count}</span>
          <div
            className="w-full bg-primary/80 rounded-t transition-all duration-500"
            style={{ height: `${(count / maxCount) * 100}%`, minHeight: count > 0 ? 8 : 2 }}
          />
          <span className="text-xs text-muted-foreground font-medium">{val}</span>
        </div>
      ))}
    </div>
  )
}

function ChoiceChart({ question, responses }: { question: Question; responses: Record<string, unknown>[] }) {
  const counts: Record<string, number> = {}
  question.options?.forEach((o) => (counts[o] = 0))
  responses.forEach((r) => {
    const v = String(r[question.id])
    if (v in counts) counts[v]++
  })
  const total = responses.length || 1

  return (
    <div className="space-y-2">
      {question.options?.map((opt) => {
        const pct = Math.round((counts[opt] / total) * 100)
        return (
          <div key={opt} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">{opt}</span>
              <span className="text-muted-foreground font-medium">{counts[opt]} ({pct}%)</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
