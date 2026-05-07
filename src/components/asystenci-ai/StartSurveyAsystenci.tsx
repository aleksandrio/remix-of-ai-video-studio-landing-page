import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResultsAsystenci } from './LiveStartResultsAsystenci'
import { useT } from '@/lib/i18n'

const AI_USAGE_OPTIONS = {
  pl: ['Tak, często', 'Czasem', 'Próbowałem/am raz–dwa', 'Nigdy'],
  en: ['Yes, often', 'Sometimes', 'I tried once or twice', 'Never'],
}
const WOULD_USE_FOR = {
  pl: ['Tłumaczenie trudnych tematów', 'Przygotowanie do sprawdzianu', 'Nauka języków', 'Pomoc w zadaniach domowych', 'Pisanie tekstów / wypracowań', 'Nic — nie ufam AI'],
  en: ['Explaining hard topics', 'Test prep', 'Learning languages', 'Help with homework', 'Writing essays', "Nothing — I don't trust AI"],
}

const LESSON_SLUG = '3-asystenci-ai'
interface Props { sessionId: string }

export function StartSurveyAsystenci({ sessionId }: Props) {
  const ai = useT(AI_USAGE_OPTIONS)
  const wo = useT(WOULD_USE_FOR)
  const t = useT({
    pl: {
      thanks: 'Dzięki! ✅', title: 'Szybka ankieta na start (anonimowa)',
      sub: 'Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.',
      q1: 'Czy rozmawiałeś/aś kiedyś z AI (chatbotem)?',
      q2: 'Do czego AI mogłoby Ci się przydać w nauce?',
      q3: 'Na ile ufasz odpowiedziom AI? (1–5)',
      low: 'Wcale', high: 'Bardzo',
      submit: 'Wyślij odpowiedzi', sending: 'Wysyłanie...',
    },
    en: {
      thanks: 'Thanks! ✅', title: 'Quick start survey (anonymous)',
      sub: "Before we begin — 30 seconds. Don't enter personal data.",
      q1: 'Have you ever talked to an AI (chatbot)?',
      q2: 'What could AI help you with in learning?',
      q3: 'How much do you trust AI answers? (1–5)',
      low: 'Not at all', high: 'A lot',
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

  const isComplete = answers.ai_usage && ((answers.would_use_for as string[])?.length || 0) > 0 && answers.trust_level

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
        <LiveStartResultsAsystenci sessionId={sessionId} />
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
            {ai.map((opt, i) => (
              <button key={i} onClick={() => setAnswers(a => ({ ...a, ai_usage: AI_USAGE_OPTIONS.pl[i] }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.ai_usage === AI_USAGE_OPTIONS.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q2}</p>
          <div className="flex flex-wrap gap-2">
            {wo.map((opt, i) => (
              <button key={i} onClick={() => toggleMulti('would_use_for', WOULD_USE_FOR.pl[i])}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.would_use_for as string[]) || []).includes(WOULD_USE_FOR.pl[i]) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q3}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.low}</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button key={v} onClick={() => setAnswers(a => ({ ...a, trust_level: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${answers.trust_level === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
                {v}
              </button>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.high}</span>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={submitting || !isComplete}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90">
          {submitting ? t.sending : t.submit}
        </button>
      </div>

      <LiveStartResultsAsystenci sessionId={sessionId} />
    </div>
  )
}
