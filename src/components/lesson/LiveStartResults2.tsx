import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useT } from '@/lib/i18n'

interface Props { lessonSlug: string; sessionId: string }
interface ResponseRow { payload: Record<string, unknown> }

export function LiveStartResults2({ lessonSlug, sessionId }: Props) {
  const [responses, setResponses] = useState<ResponseRow[]>([])

  const t = useT({
    pl: { wait: 'Wyniki pojawią się po pierwszych odpowiedziach…', live: '📊 Wyniki na żywo', r1: 'odpowiedź', rN: 'odpowiedzi', q1: 'Motywacja do nauki', q2: 'Znane metody uczenia się', q3: 'Jak najczęściej się uczysz?', q4: 'Czas nauki dziennie', avg: 'Średnia skuteczność nauki' },
    en: { wait: 'Results will appear after the first answers…', live: '📊 Live results', r1: 'response', rN: 'responses', q1: 'Motivation to study', q2: 'Known study methods', q3: 'How do you usually study?', q4: 'Daily study time', avg: 'Average study effectiveness' },
  })

  useEffect(() => {
    supabase
      .from('survey_responses')
      .select('payload')
      .eq('lesson_slug', lessonSlug)
      .eq('session_id', sessionId)
      .eq('survey_type', 'start')
      .then(({ data }) => { if (data) setResponses(data as unknown as ResponseRow[]) })

    const channel = supabase
      .channel(`live2-${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public', table: 'survey_responses',
        filter: `session_id=eq.${sessionId}`,
      }, (payload) => {
        const row = payload.new as { survey_type: string; payload: Record<string, unknown> }
        if (row.survey_type === 'start') setResponses(prev => [...prev, { payload: row.payload }])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [lessonSlug, sessionId])

  const total = responses.length
  const countSingle = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach(r => { const v = r.payload[field] as string; if (v) counts[v] = (counts[v] || 0) + 1 })
    return counts
  }
  const countMulti = (field: string) => {
    const counts: Record<string, number> = {}
    responses.forEach(r => { const arr = r.payload[field] as string[]; if (Array.isArray(arr)) arr.forEach(v => { counts[v] = (counts[v] || 0) + 1 }) })
    return counts
  }
  const avgEffectiveness = total > 0
    ? (responses.reduce((s, r) => s + (Number(r.payload.effectiveness) || 0), 0) / total).toFixed(1)
    : '—'

  const motivation = countSingle('motivation')
  const methods = countMulti('methods_known')
  const currentMethod = countMulti('current_method')
  const studyTime = countSingle('study_time')
  const sortedEntries = (obj: Record<string, number>) => Object.entries(obj).sort((a, b) => b[1] - a[1])

  if (total === 0) {
    return <div className="bg-card border border-border rounded-lg p-6 text-center"><p className="text-muted-foreground text-sm">{t.wait}</p></div>
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-foreground">{t.live}</h3>
        <span className="text-xs text-muted-foreground">{total} {total === 1 ? t.r1 : t.rN}</span>
      </div>
      <ResultBlock title={t.q1} data={sortedEntries(motivation)} total={total} />
      <ResultBlock title={t.q2} data={sortedEntries(methods)} total={total} />
      <ResultBlock title={t.q3} data={sortedEntries(currentMethod)} total={total} />
      <ResultBlock title={t.q4} data={sortedEntries(studyTime)} total={total} />
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{t.avg}</p>
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
