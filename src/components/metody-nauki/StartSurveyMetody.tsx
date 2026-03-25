import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResultsMetody } from './LiveStartResultsMetody'

const STUDY_METHOD_OPTIONS = [
  'Czytam notatki kilka razy',
  'Przepisuję notatki',
  'Robię fiszki i quizy',
  'Tłumaczę temat komuś innemu',
  'Właściwie nie uczę się',
]

const TIME_OPTIONS = [
  'Na przerwie przed sprawdzianem',
  'Dzień przed',
  '2–3 dni przed',
  'Tydzień przed',
  'Uczę się na bieżąco',
]

const PROBLEM_OPTIONS = [
  'Zapamiętanie dat i faktów',
  'Rozumienie pojęć',
  'Łączenie wiedzy z różnych tematów',
  'Motywacja do nauki',
  'Brak czasu',
]

interface Props {
  sessionId: string
}

const LESSON_SLUG = '2-metody-nauki'

export function StartSurveyMetody({ sessionId }: Props) {
  const storageKey = `start_survey_${LESSON_SLUG}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const toggleMulti = (field: string, val: string) => {
    setAnswers((a) => {
      const arr = (a[field] as string[]) || []
      return { ...a, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] }
    })
  }

  const isComplete =
    answers.study_method &&
    answers.time_before_test &&
    ((answers.biggest_problem as string[])?.length || 0) > 0 &&
    answers.effectiveness

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: LESSON_SLUG,
        session_id: sessionId,
        survey_type: 'start',
        payload: answers as unknown as import('@/integrations/supabase/types').Json,
      }])
      if (!error) {
        localStorage.setItem(storageKey, '1')
        setSubmitted(true)
      }
    } finally {
      setSubmitting(false)
    }
  }, [answers, isComplete, sessionId, storageKey])

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
          <p className="text-foreground font-heading text-lg font-semibold">Dzięki! ✅</p>
        </div>
        <LiveStartResultsMetody sessionId={sessionId} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Szybka ankieta na start (anonimowa)</h3>
          <p className="text-muted-foreground text-sm mt-1">Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.</p>
        </div>

        {/* 1) study_method - single */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak uczysz się przed klasówką?</p>
          <div className="flex flex-col gap-2">
            {STUDY_METHOD_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(a => ({ ...a, study_method: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.study_method === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2) time_before_test - single */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Ile czasu masz zwykle do klasówki gdy zaczynasz naukę?</p>
          <div className="flex flex-col gap-2">
            {TIME_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(a => ({ ...a, time_before_test: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.time_before_test === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3) biggest_problem - multi */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Co sprawia Ci największy kłopot? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {PROBLEM_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => toggleMulti('biggest_problem', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.biggest_problem as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 4) effectiveness 1-5 */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak oceniasz skuteczność swojego uczenia się? (1–5)</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Słabo</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button
                key={v}
                onClick={() => setAnswers(a => ({ ...a, effectiveness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                  answers.effectiveness === v
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap">Super</span>
          </div>
        </div>

        {/* 5) open_answer */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Co chciałbyś zmienić w swoim uczeniu się?</p>
          <textarea
            className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            maxLength={500}
            placeholder="Twoja odpowiedź (opcjonalne)..."
            value={(answers.open_answer as string) || ''}
            onChange={e => setAnswers(a => ({ ...a, open_answer: e.target.value }))}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || !isComplete}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90"
        >
          {submitting ? 'Wysyłanie...' : 'Wyślij odpowiedzi'}
        </button>
      </div>

      <LiveStartResultsMetody sessionId={sessionId} />
    </div>
  )
}
