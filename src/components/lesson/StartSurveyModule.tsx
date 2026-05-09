import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResults } from './LiveStartResults'
import { useT } from '@/lib/i18n'

const USES_AI = { pl: ['Tak, często', 'Tak, czasem', 'Nie'], en: ['Yes, often', 'Yes, sometimes', 'No'] }
const TOOLS = { pl: ['Gemini', 'ChatGPT', 'Claude', 'NotebookLM', 'Perplexity', 'Inne'], en: ['Gemini', 'ChatGPT', 'Claude', 'NotebookLM', 'Perplexity', 'Other'] }
const USE_CASES = {
  pl: ['Nauka / tłumaczenie tematów', 'Odrabianie prac domowych', 'Robienie notatek / streszczeń', 'Prezentacje / grafiki / wideo', 'Programowanie', 'Inne'],
  en: ['Studying / explaining topics', 'Doing homework', 'Notes / summaries', 'Presentations / graphics / video', 'Programming', 'Other'],
}
const CHEATING = { pl: ['Tak', 'Nie', 'Wolę nie odpowiadać'], en: ['Yes', 'No', 'Prefer not to say'] }

interface Props { lessonSlug: string; sessionId: string }

export function StartSurveyModule({ lessonSlug, sessionId }: Props) {
  const storageKey = `start_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const t = useT({
    pl: {
      thanks: 'Dzięki! ✅', title: 'Szybka ankieta na start (anonimowa)', sub: 'Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.',
      q1: 'Czy korzystasz z narzędzi AI?', q2: 'Jakie narzędzia AI znasz?', other: 'Jakie inne narzędzia?',
      q3: 'Do czego używasz AI?', other2: 'Inne zastosowania?', q4: 'Czy AI pomaga Ci „ściągać" w szkole?',
      q5: 'Jak pomocne jest AI w nauce? (1–5)', low: 'Wcale', high: 'Bardzo',
      q6: 'Opisz w 1–3 zdaniach jak konkretnie używasz AI.', placeholder: 'Twoja odpowiedź (opcjonalne)...',
      sending: 'Wysyłanie...', send: 'Wyślij odpowiedzi', otherKey: 'Inne',
    },
    en: {
      thanks: 'Thanks! ✅', title: 'Quick start survey (anonymous)', sub: 'Before we start — 30 seconds. Do not enter personal data.',
      q1: 'Do you use AI tools?', q2: 'Which AI tools do you know?', other: 'Which other tools?',
      q3: 'What do you use AI for?', other2: 'Other use cases?', q4: 'Does AI help you "cheat" at school?',
      q5: 'How helpful is AI for learning? (1–5)', low: 'Not at all', high: 'Very',
      q6: 'Describe in 1–3 sentences how you use AI.', placeholder: 'Your answer (optional)...',
      sending: 'Sending...', send: 'Submit answers', otherKey: 'Other',
    },
  })
  const usesAi = useT(USES_AI), tools = useT(TOOLS), useCases = useT(USE_CASES), cheating = useT(CHEATING)

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
        lesson_slug: lessonSlug, session_id: sessionId, survey_type: 'start',
        payload: answers as unknown as import('@/integrations/supabase/types').Json,
      }])
      if (!error) { localStorage.setItem(storageKey, '1'); setSubmitted(true) }
    } finally { setSubmitting(false) }
  }, [answers, isComplete, lessonSlug, sessionId, storageKey])

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
          <p className="text-foreground font-heading text-lg font-semibold">{t.thanks}</p>
        </div>
        <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} />
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
            {usesAi.map(opt => (
              <button key={opt} onClick={() => setAnswers(a => ({ ...a, uses_ai: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.uses_ai === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q2}</p>
          <div className="flex flex-wrap gap-2">
            {tools.map(opt => (
              <button key={opt} onClick={() => toggleMulti('tools_known', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.tools_known as string[]) || []).includes(opt) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
          {((answers.tools_known as string[]) || []).some(v => v === 'Inne' || v === 'Other') && (
            <input placeholder={t.other} value={(answers.other_tools as string) || ''}
              onChange={e => setAnswers(a => ({ ...a, other_tools: e.target.value }))}
              className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          )}
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q3}</p>
          <div className="flex flex-wrap gap-2">
            {useCases.map(opt => (
              <button key={opt} onClick={() => toggleMulti('use_cases', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.use_cases as string[]) || []).includes(opt) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
          {((answers.use_cases as string[]) || []).some(v => v === 'Inne' || v === 'Other') && (
            <input placeholder={t.other2} value={(answers.other_use_cases as string) || ''}
              onChange={e => setAnswers(a => ({ ...a, other_use_cases: e.target.value }))}
              className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          )}
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q4}</p>
          <div className="flex flex-col gap-2">
            {cheating.map(opt => (
              <button key={opt} onClick={() => setAnswers(a => ({ ...a, cheating: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.cheating === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q5}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.low}</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button key={v} onClick={() => setAnswers(a => ({ ...a, helpfulness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${answers.helpfulness === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{v}</button>
            ))}
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.high}</span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q6}</p>
          <textarea className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3} maxLength={500} placeholder={t.placeholder}
            value={(answers.open_answer as string) || ''}
            onChange={e => setAnswers(a => ({ ...a, open_answer: e.target.value }))} />
        </div>

        <button onClick={handleSubmit} disabled={submitting || !isComplete}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90">
          {submitting ? t.sending : t.send}
        </button>
      </div>

      <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} />
    </div>
  )
}
