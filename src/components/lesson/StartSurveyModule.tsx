import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResults } from './LiveStartResults'

const USES_AI_OPTIONS = ['Tak, często', 'Tak, czasem', 'Nie', 'Dopiero zaczynam']
const TOOLS_OPTIONS = ['Gemini', 'ChatGPT', 'Claude', 'NotebookLM', 'Perplexity', 'Inne']
const USE_CASES_OPTIONS = [
  'Nauka / tłumaczenie tematów',
  'Odrabianie prac domowych',
  'Robienie notatek / streszczeń',
  'Prezentacje / grafiki / wideo',
  'Programowanie',
  'Inne',
]
const CHEATING_OPTIONS = ['Tak', 'Nie', 'Wolę nie odpowiadać']

interface Props {
  lessonSlug: string
  sessionId: string
}

export function StartSurveyModule({ lessonSlug, sessionId }: Props) {
  const storageKey = `start_survey_${lessonSlug}_${sessionId}`
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
    answers.uses_ai &&
    ((answers.tools_known as string[])?.length || 0) > 0 &&
    ((answers.use_cases as string[])?.length || 0) > 0 &&
    answers.cheating &&
    answers.helpfulness

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: lessonSlug,
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
  }, [answers, isComplete, lessonSlug, sessionId, storageKey])

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
          <p className="text-foreground font-heading text-lg font-semibold">Dzięki! ✅</p>
        </div>
        <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Szybka ankieta na start (anonimowa)</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.
          </p>
        </div>

        {/* 1) uses_ai */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Czy korzystasz z narzędzi AI?</p>
          <div className="flex flex-col gap-2">
            {USES_AI_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswers((a) => ({ ...a, uses_ai: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.uses_ai === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2) tools_known */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jakie narzędzia AI znasz? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {TOOLS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleMulti('tools_known', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.tools_known as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {((answers.tools_known as string[]) || []).includes('Inne') && (
            <input
              placeholder="Jakie inne narzędzia?"
              value={(answers.other_tools as string) || ''}
              onChange={(e) => setAnswers((a) => ({ ...a, other_tools: e.target.value }))}
              className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </div>

        {/* 3) use_cases */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Do czego używasz AI? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {USE_CASES_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleMulti('use_cases', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.use_cases as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {((answers.use_cases as string[]) || []).includes('Inne') && (
            <input
              placeholder="Inne zastosowania?"
              value={(answers.other_use_cases as string) || ''}
              onChange={(e) => setAnswers((a) => ({ ...a, other_use_cases: e.target.value }))}
              className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </div>

        {/* 4) cheating */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Czy AI pomaga Ci „ściągać" w szkole?</p>
          <div className="flex flex-col gap-2">
            {CHEATING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswers((a) => ({ ...a, cheating: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.cheating === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 5) helpfulness */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak pomocne jest AI w nauce? (1–5)</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Wcale</span>
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => setAnswers((a) => ({ ...a, helpfulness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                  answers.helpfulness === v
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

        {/* 6) open_answer */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Opisz w 1–3 zdaniach jak konkretnie używasz AI.</p>
          <textarea
            className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            maxLength={500}
            placeholder="Twoja odpowiedź (opcjonalne)..."
            value={(answers.open_answer as string) || ''}
            onChange={(e) => setAnswers((a) => ({ ...a, open_answer: e.target.value }))}
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

      <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} />
    </div>
  )
}
