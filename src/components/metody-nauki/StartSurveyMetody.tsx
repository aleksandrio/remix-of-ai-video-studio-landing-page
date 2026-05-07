import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResultsMetody } from './LiveStartResultsMetody'
import { useT } from '@/lib/i18n'

const STUDY_METHOD_OPTIONS = {
  pl: ['Czytam notatki kilka razy', 'Przepisuję notatki', 'Robię fiszki i quizy', 'Tłumaczę temat komuś innemu', 'Właściwie nie uczę się'],
  en: ['I reread my notes', 'I rewrite my notes', 'I make flashcards and quizzes', 'I explain the topic to someone else', "I don't really study"],
}

const TIME_OPTIONS = {
  pl: ['Na przerwie przed sprawdzianem', 'Dzień przed', '2–3 dni przed', 'Tydzień przed', 'Uczę się na bieżąco'],
  en: ['During the break before the test', 'The day before', '2–3 days before', 'A week before', 'I study as I go'],
}

const PROBLEM_OPTIONS = {
  pl: ['Zapamiętanie dat i faktów', 'Rozumienie pojęć', 'Łączenie wiedzy z różnych tematów', 'Motywacja do nauki', 'Brak czasu'],
  en: ['Remembering dates and facts', 'Understanding concepts', 'Connecting knowledge from different topics', 'Motivation to study', 'Lack of time'],
}

interface Props {
  sessionId: string
}

const LESSON_SLUG = '2-metody-nauki'

export function StartSurveyMetody({ sessionId }: Props) {
  const studyMethods = useT(STUDY_METHOD_OPTIONS)
  const timeOpts = useT(TIME_OPTIONS)
  const problemOpts = useT(PROBLEM_OPTIONS)
  const t = useT({
    pl: {
      thanks: 'Dzięki! ✅', title: 'Szybka ankieta na start (anonimowa)',
      sub: 'Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.',
      q1: 'Jak uczysz się przed klasówką?',
      q2: 'Ile czasu masz zwykle do klasówki gdy zaczynasz naukę?',
      q3: 'Co sprawia Ci największy kłopot? (zaznacz wszystkie)',
      q4: 'Jak oceniasz skuteczność swojego uczenia się? (1–5)',
      q5: 'Co chciałbyś zmienić w swoim uczeniu się?',
      low: 'Słabo', high: 'Super',
      placeholder: 'Twoja odpowiedź (opcjonalne)...',
      submit: 'Wyślij odpowiedzi', sending: 'Wysyłanie...',
    },
    en: {
      thanks: 'Thanks! ✅', title: 'Quick start survey (anonymous)',
      sub: "Before we begin — 30 seconds. Don't enter personal data.",
      q1: 'How do you study before a test?',
      q2: 'How much time do you usually have before a test when you start studying?',
      q3: 'What gives you the biggest trouble? (select all)',
      q4: 'How do you rate the effectiveness of your studying? (1–5)',
      q5: "What would you like to change about how you study?",
      low: 'Weak', high: 'Great',
      placeholder: 'Your answer (optional)...',
      submit: 'Submit answers', sending: 'Sending...',
    },
  })
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
    answers.study_method && answers.time_before_test &&
    ((answers.biggest_problem as string[])?.length || 0) > 0 && answers.effectiveness

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: LESSON_SLUG, session_id: sessionId, survey_type: 'start',
        payload: answers as unknown as import('@/integrations/supabase/types').Json,
      }])
      if (!error) { localStorage.setItem(storageKey, '1'); setSubmitted(true) }
    } finally { setSubmitting(false) }
  }, [answers, isComplete, sessionId, storageKey])

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
          <p className="text-foreground font-heading text-lg font-semibold">{t.thanks}</p>
        </div>
        <LiveStartResultsMetody sessionId={sessionId} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">{t.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q1}</p>
          <div className="flex flex-col gap-2">
            {studyMethods.map((opt, i) => (
              <button key={i} onClick={() => setAnswers(a => ({ ...a, study_method: STUDY_METHOD_OPTIONS.pl[i] }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.study_method === STUDY_METHOD_OPTIONS.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q2}</p>
          <div className="flex flex-col gap-2">
            {timeOpts.map((opt, i) => (
              <button key={i} onClick={() => setAnswers(a => ({ ...a, time_before_test: TIME_OPTIONS.pl[i] }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.time_before_test === TIME_OPTIONS.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q3}</p>
          <div className="flex flex-wrap gap-2">
            {problemOpts.map((opt, i) => (
              <button key={i} onClick={() => toggleMulti('biggest_problem', PROBLEM_OPTIONS.pl[i])}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.biggest_problem as string[]) || []).includes(PROBLEM_OPTIONS.pl[i]) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q4}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.low}</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button key={v} onClick={() => setAnswers(a => ({ ...a, effectiveness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${answers.effectiveness === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {v}
              </button>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.high}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q5}</p>
          <textarea className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3} maxLength={500} placeholder={t.placeholder}
            value={(answers.open_answer as string) || ''}
            onChange={e => setAnswers(a => ({ ...a, open_answer: e.target.value }))} />
        </div>

        <button onClick={handleSubmit} disabled={submitting || !isComplete}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90">
          {submitting ? t.sending : t.submit}
        </button>
      </div>

      <LiveStartResultsMetody sessionId={sessionId} />
    </div>
  )
}
