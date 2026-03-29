import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResultsAsystenci } from './LiveStartResultsAsystenci'

const AI_USAGE_OPTIONS = [
  'Tak, często',
  'Czasem',
  'Próbowałem/am raz–dwa',
  'Nigdy',
]

const KNOWN_ASSISTANTS = [
  'ChatGPT',
  'Gemini',
  'Claude',
  'Copilot (Microsoft)',
  'Inne',
  'Żadnego nie znam',
]

const WOULD_USE_FOR = [
  'Tłumaczenie trudnych tematów',
  'Przygotowanie do sprawdzianu',
  'Nauka języków',
  'Pomoc w zadaniach domowych',
  'Pisanie tekstów / wypracowań',
  'Nic — nie ufam AI',
]

const LESSON_SLUG = '3-asystenci-ai'

interface Props {
  sessionId: string
}

export function StartSurveyAsystenci({ sessionId }: Props) {
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
    answers.ai_usage &&
    ((answers.known_assistants as string[])?.length || 0) > 0 &&
    ((answers.would_use_for as string[])?.length || 0) > 0 &&
    answers.trust_level

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
        <LiveStartResultsAsystenci sessionId={sessionId} />
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

        {/* 1) ai_usage - single */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Czy rozmawiałeś/aś kiedyś z AI (chatbotem)?</p>
          <div className="flex flex-col gap-2">
            {AI_USAGE_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(a => ({ ...a, ai_usage: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.ai_usage === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2) known_assistants - multi */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Których asystentów AI znasz? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {KNOWN_ASSISTANTS.map(opt => (
              <button
                key={opt}
                onClick={() => toggleMulti('known_assistants', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.known_assistants as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3) would_use_for - multi */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Do czego AI mogłoby Ci się przydać w nauce? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {WOULD_USE_FOR.map(opt => (
              <button
                key={opt}
                onClick={() => toggleMulti('would_use_for', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.would_use_for as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 4) trust_level 1-5 */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Na ile ufasz odpowiedziom AI? (1–5)</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Wcale</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button
                key={v}
                onClick={() => setAnswers(a => ({ ...a, trust_level: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                  answers.trust_level === v
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {v}
              </button>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap">Bardzo</span>
          </div>
        </div>

        {/* 5) open_answer */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Czego chciałbyś się dziś dowiedzieć o AI?</p>
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

      <LiveStartResultsAsystenci sessionId={sessionId} />
    </div>
  )
}
