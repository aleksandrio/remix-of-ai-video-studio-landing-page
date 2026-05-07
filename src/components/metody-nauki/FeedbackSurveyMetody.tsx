import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useT } from '@/lib/i18n'

const TOOL_OPTIONS = {
  pl: ['Podsumowanie audio', 'Prezentacja', 'Podsumowanie wideo', 'Mapa myśli', 'Fiszki', 'Quiz', 'Infografika', 'Raporty'],
  en: ['Audio overview', 'Slide deck', 'Video overview', 'Mind map', 'Flashcards', 'Quiz', 'Infographic', 'Reports'],
}
const METHOD_OPTIONS = {
  pl: ['Active Recall (własne fiszki)', 'Powtórki rozłożone w czasie', 'Mapa myśli na kartce', 'Wytłumaczę temat komuś innemu', 'Technika Feynmana'],
  en: ['Active recall (my own flashcards)', 'Spaced repetition', 'Mind map on paper', 'Explaining the topic to someone', 'Feynman technique'],
}
const PACE_OPTIONS = { pl: ['Za szybko', 'W sam raz', 'Za wolno'], en: ['Too fast', 'Just right', 'Too slow'] }
const USEFUL_OPTIONS = {
  pl: ['Tak, na pewno!', 'Raczej tak', 'Nie jestem pewien/a', 'Raczej nie'],
  en: ['Yes, definitely!', 'Probably yes', "I'm not sure", 'Probably not'],
}

const LESSON_SLUG = '2-metody-nauki'

interface Props { sessionId: string }

export function FeedbackSurveyMetody({ sessionId }: Props) {
  const tools = useT(TOOL_OPTIONS)
  const methods = useT(METHOD_OPTIONS)
  const pace = useT(PACE_OPTIONS)
  const useful = useT(USEFUL_OPTIONS)
  const t = useT({
    pl: {
      thanks: 'Dziękuję za feedback! 🙏', title: 'Feedback po zajęciach',
      sub: 'Ankieta anonimowa — nie wpisuj danych osobowych.',
      q1: 'Które narzędzie NotebookLM najbardziej Ci się podoba? (zaznacz wszystkie)',
      q2: 'Którą metodę uczenia się spróbujesz przed najbliższą klasówką? (zaznacz wszystkie)',
      q3: 'Tempo zajęć:',
      q4: 'Czy nauczyłeś/aś się czegoś przydatnego?',
      q5: 'Inne uwagi (opcjonalne)',
      placeholder: 'Twoje uwagi...',
      submit: 'Wyślij feedback', sending: 'Wysyłanie...',
    },
    en: {
      thanks: 'Thanks for the feedback! 🙏', title: 'Post-class feedback',
      sub: "Anonymous survey — don't enter personal data.",
      q1: 'Which NotebookLM tool do you like most? (select all)',
      q2: 'Which learning method will you try before your next test? (select all)',
      q3: 'Pace of the class:',
      q4: 'Did you learn something useful?',
      q5: 'Other comments (optional)',
      placeholder: 'Your comments...',
      submit: 'Send feedback', sending: 'Sending...',
    },
  })
  const storageKey = `feedback_survey_${LESSON_SLUG}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const toggleMulti = (field: string, val: string) => {
    setAnswers((a) => {
      const arr = (a[field] as string[]) || []
      return { ...a, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] }
    })
  }

  const isComplete = ((answers.favorite_tool as string[])?.length || 0) > 0
    && ((answers.method_to_try as string[])?.length || 0) > 0
    && answers.pace && answers.learned_useful

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: LESSON_SLUG, session_id: sessionId, survey_type: 'feedback',
        payload: answers as unknown as import('@/integrations/supabase/types').Json,
      }])
      if (!error) { localStorage.setItem(storageKey, '1'); setSubmitted(true) }
    } finally { setSubmitting(false) }
  }, [answers, isComplete, sessionId, storageKey])

  if (submitted) {
    return <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
      <p className="text-foreground font-heading text-lg font-semibold">{t.thanks}</p>
    </div>
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground">{t.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q1}</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((opt, i) => (
            <button key={i} onClick={() => toggleMulti('favorite_tool', TOOL_OPTIONS.pl[i])}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.favorite_tool as string[]) || []).includes(TOOL_OPTIONS.pl[i]) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q2}</p>
        <div className="flex flex-wrap gap-2">
          {methods.map((opt, i) => (
            <button key={i} onClick={() => toggleMulti('method_to_try', METHOD_OPTIONS.pl[i])}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.method_to_try as string[]) || []).includes(METHOD_OPTIONS.pl[i]) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q3}</p>
        <div className="flex gap-2 flex-wrap">
          {pace.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(a => ({ ...a, pace: PACE_OPTIONS.pl[i] }))}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${answers.pace === PACE_OPTIONS.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q4}</p>
        <div className="flex gap-2 flex-wrap">
          {useful.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(a => ({ ...a, learned_useful: USEFUL_OPTIONS.pl[i] }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${answers.learned_useful === USEFUL_OPTIONS.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q5}</p>
        <textarea className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows={3} maxLength={500} placeholder={t.placeholder}
          value={(answers.other_comments as string) || ''}
          onChange={e => setAnswers(a => ({ ...a, other_comments: e.target.value }))} />
      </div>

      <button onClick={handleSubmit} disabled={submitting || !isComplete}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90">
        {submitting ? t.sending : t.submit}
      </button>
    </div>
  )
}
