import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface Props {
  lessonSlug: string
  sessionId: string
}

export function LiveStartResults({ lessonSlug, sessionId }: Props) {
  const [responses, setResponses] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    supabase
      .from('survey_responses')
      .select('payload')
      .eq('lesson_slug', lessonSlug)
      .eq('session_id', sessionId)
      .eq('survey_type', 'start')
      .then(({ data }) => {
        if (data) setResponses(data.map((r) => r.payload as Record<string, unknown>))
      })

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

    return () => { supabase.removeChannel(channel) }
  }, [lessonSlug, sessionId])

  const total = responses.length

  // Aggregations
  const countSingle = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach((r) => {
      const v = r[field] as string
      if (v) counts[v] = (counts[v] || 0) + 1
    })
    return counts
  }

  const countMulti = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach((r) => {
      const arr = r[field] as string[]
      if (Array.isArray(arr)) arr.forEach((v) => { counts[v] = (counts[v] || 0) + 1 })
    })
    return counts
  }

  const avgHelpfulness = total
    ? (responses.reduce((s, r) => s + (Number(r.helpfulness) || 0), 0) / total).toFixed(1)
    : '—'

  const usesAi = countSingle('uses_ai')
  const tools = countMulti('tools_known')
  const useCases = countMulti('use_cases')
  const cheating = countSingle('cheating')
  const helpDist: Record<number, number> = {}
  for (let i = 1; i <= 5; i++) helpDist[i] = 0
  responses.forEach((r) => {
    const v = Number(r.helpfulness)
    if (v >= 1 && v <= 5) helpDist[v]++
  })

  const sortedEntries = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-heading text-xl font-bold text-foreground">Wyniki na żywo dla tej grupy</h3>
        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
          {total} {total === 1 ? 'odpowiedź' : 'odpowiedzi'}
        </span>
      </div>

      {total === 0 ? (
        <p className="text-muted-foreground text-center py-8">Czekam na odpowiedzi...</p>
      ) : (
        <>
          {/* uses_ai */}
          <ResultBlock title="Czy korzystasz z AI?" data={sortedEntries(usesAi)} total={total} />

          {/* tools ranking */}
          <ResultBlock title="Znane narzędzia (ranking)" data={sortedEntries(tools)} total={total} />

          {/* use_cases */}
          <ResultBlock title="Do czego używasz AI?" data={sortedEntries(useCases)} total={total} />

          {/* cheating */}
          <ResultBlock title="Czy AI pomaga Ci ściągać?" data={sortedEntries(cheating)} total={total} />

          {/* helpfulness */}
          <div className="space-y-3">
            <p className="font-medium text-foreground text-sm md:text-base">Pomocność AI (1–5) — średnia: {avgHelpfulness}</p>
            <div className="flex items-end gap-2 h-28">
              {Object.entries(helpDist).map(([val, count]) => {
                const maxC = Math.max(...Object.values(helpDist), 1)
                return (
                  <div key={val} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-foreground">{count}</span>
                    <div
                      className="w-full bg-primary/80 rounded-t transition-all duration-500"
                      style={{ height: `${(count / maxC) * 100}%`, minHeight: count > 0 ? 8 : 2 }}
                    />
                    <span className="text-xs text-muted-foreground font-medium">{val}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ResultBlock({ title, data, total }: { title: string; data: [string, number][]; total: number }) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-foreground text-sm md:text-base">{title}</p>
      <div className="space-y-1.5">
        {data.map(([label, count]) => {
          const pct = Math.round((count / total) * 100)
          return (
            <div key={label} className="space-y-0.5">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{label}</span>
                <span className="text-muted-foreground font-medium">{count} ({pct}%)</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
