import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useT } from '@/lib/i18n'

const LESSON_SLUG = '3-asystenci-ai'

interface Props {
  sessionId: string
}

interface ResponseRow {
  payload: Record<string, unknown>
}

export function LiveStartResultsAsystenci({ sessionId }: Props) {
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
      .channel(`live-asystenci-${sessionId}`)
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

  const avgTrust = total > 0
    ? (responses.reduce((s, r) => s + (Number(r.payload.trust_level) || 0), 0) / total).toFixed(1)
    : '—'

  const sortedEntries = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])

  const t = useT({
    pl: { wait: 'Wyniki pojawią się po pierwszych odpowiedziach…', live: '📊 Wyniki na żywo', resp1: 'odpowiedź', respN: 'odpowiedzi', q1: 'Czy rozmawiałeś/aś z AI?', q2: 'Znani asystenci', q3: 'Do czego przydałoby się AI?', avg: 'Średnie zaufanie do AI' },
    en: { wait: 'Results will appear after the first answers…', live: '📊 Live results', resp1: 'response', respN: 'responses', q1: 'Have you talked to AI?', q2: 'Known assistants', q3: 'What could AI help with?', avg: 'Average trust in AI' },
  })

  if (total === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <p className="text-muted-foreground text-sm">{t.wait}</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-foreground">{t.live}</h3>
        <span className="text-xs text-muted-foreground">{total} {total === 1 ? t.resp1 : t.respN}</span>
      </div>

      <ResultBlock title={t.q1} data={sortedEntries(countSingle('ai_usage'))} total={total} />
      <ResultBlock title={t.q2} data={sortedEntries(countMulti('known_assistants'))} total={total} />
      <ResultBlock title={t.q3} data={sortedEntries(countMulti('would_use_for'))} total={total} />

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{t.avg}</p>
        <p className="text-3xl font-bold text-primary">{avgTrust}<span className="text-sm font-normal text-muted-foreground"> / 5</span></p>
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
