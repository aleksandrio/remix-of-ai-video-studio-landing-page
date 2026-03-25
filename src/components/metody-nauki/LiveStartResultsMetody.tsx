import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'

const LESSON_SLUG = '2-metody-nauki'

interface Props {
  sessionId: string
}

interface ResponseRow {
  payload: Record<string, unknown>
}

export function LiveStartResultsMetody({ sessionId }: Props) {
  const [responses, setResponses] = useState<ResponseRow[]>([])

  useEffect(() => {
    supabase
      .from('survey_responses')
      .select('payload')
      .eq('lesson_slug', LESSON_SLUG)
      .eq('session_id', sessionId)
      .eq('survey_type', 'start')
      .then(({ data }) => {
        if (data) setResponses(data as unknown as ResponseRow[])
      })

    const channel = supabase
      .channel(`live-metody-${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'survey_responses',
        filter: `session_id=eq.${sessionId}`,
      }, (payload) => {
        const row = payload.new as { survey_type: string; payload: Record<string, unknown> }
        if (row.survey_type === 'start') {
          setResponses(prev => [...prev, { payload: row.payload }])
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [sessionId])

  const total = responses.length

  const countSingle = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach(r => {
      const v = r.payload[field] as string
      if (v) counts[v] = (counts[v] || 0) + 1
    })
    return counts
  }

  const countMulti = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach(r => {
      const arr = r.payload[field] as string[]
      if (Array.isArray(arr)) arr.forEach(v => { counts[v] = (counts[v] || 0) + 1 })
    })
    return counts
  }

  const avgEffectiveness = total > 0
    ? (responses.reduce((s, r) => s + (Number(r.payload.effectiveness) || 0), 0) / total).toFixed(1)
    : '—'

  const studyMethod = countSingle('study_method')
  const timeBeforeTest = countSingle('time_before_test')
  const biggestProblem = countMulti('biggest_problem')

  const sortedEntries = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])

  if (total === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-muted-foreground text-sm">Wyniki pojawią się po pierwszych odpowiedziach…</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-foreground">📊 Wyniki na żywo</h3>
        <span className="text-xs text-muted-foreground">{total} {total === 1 ? 'odpowiedź' : 'odpowiedzi'}</span>
      </div>

      <ResultBlock title="Jak uczysz się przed klasówką?" data={sortedEntries(studyMethod)} total={total} />
      <ResultBlock title="Ile czasu do klasówki?" data={sortedEntries(timeBeforeTest)} total={total} />
      <ResultBlock title="Największy kłopot" data={sortedEntries(biggestProblem)} total={total} />

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Średnia skuteczność nauki</p>
        <p className="text-3xl font-bold text-primary">{avgEffectiveness}<span className="text-sm font-normal text-muted-foreground"> / 5</span></p>
      </div>
    </div>
  )
}

function ResultBlock({ title, data, total }: { title: string; data: [string, number][]; total: number }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <div className="space-y-1.5">
        {data.map(([label, count]) => (
          <div key={label} className="flex items-center gap-2 text-sm">
            <span className="w-2/5 truncate text-muted-foreground">{label}</span>
            <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${Math.round((count / total) * 100)}%` }} />
            </div>
            <span className="text-xs text-muted-foreground w-12 text-right">{count} ({Math.round((count / total) * 100)}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
