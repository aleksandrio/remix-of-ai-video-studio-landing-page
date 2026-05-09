import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useT } from '@/lib/i18n'

const METHODS = {
  pl: ['Mapy myśli', 'Fiszki', 'Podcasty / Audio Overview', 'Quizy / testy', 'Streszczenia i notatki', 'Powtórki rozłożone w czasie'],
  en: ['Mind maps', 'Flashcards', 'Podcasts / Audio Overview', 'Quizzes / tests', 'Summaries & notes', 'Spaced repetition'],
}
const PACE = { pl: ['Za szybko', 'W sam raz', 'Za wolno'], en: ['Too fast', 'Just right', 'Too slow'] }
const LEARNED = {
  pl: ['Tak, na pewno!', 'Raczej tak', 'Nie jestem pewien/a', 'Raczej nie'],
  en: ['Yes, definitely!', 'Probably yes', 'Not sure', 'Probably not'],
}

interface Props { lessonSlug: string; sessionId: string }

export function FeedbackSurveyModule2({ lessonSlug, sessionId }: Props) {
  const storageKey = `feedback_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const t = useT({
    pl: { thanks: 'Dziękuję za feedback! 🙏', title: 'Feedback po zajęciach', sub: 'Ankieta anonimowa — nie wpisuj danych osobowych.',
      q1: 'Która metoda uczenia się najbardziej Ci się podoba?', q2: 'Która metoda najmniej Ci odpowiada?',
      q3: 'Która metoda wg Ciebie może przynieść najlepsze efekty?', q4: 'Tempo zajęć:',
      q5: 'Czy nauczyłeś/aś się czegoś, co przyda Ci się w nauce?', q6: 'Inne uwagi (opcjonalne)', notes: 'Twoje uwagi...',
      sending: 'Wysyłanie...', send: 'Wyślij feedback' },
    en: { thanks: 'Thanks for the feedback! 🙏', title: 'Post-class feedback', sub: 'Anonymous survey — do not enter personal data.',
      q1: 'Which study method do you like most?', q2: 'Which method suits you least?',
      q3: 'Which method do you think will be most effective?', q4: 'Class pace:',
      q5: 'Did you learn something useful for studying?', q6: 'Other comments (optional)', notes: 'Your notes...',
      sending: 'Sending...', send: 'Submit feedback' },
  })
  const methods = useT(METHODS), pace = useT(PACE), learned = useT(LEARNED)

  const isComplete = answers.favorite_method && answers.least_favorite && answers.most_effective && answers.pace && answers.learned_useful

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: lessonSlug, session_id: sessionId, survey_type: 'feedback',
        payload: answers as unknown as import('@/integrations/supabase/types').Json,
      }])
      if (!error) { localStorage.setItem(storageKey, '1'); setSubmitted(true) }
    } finally { setSubmitting(false) }
  }, [answers, isComplete, lessonSlug, sessionId, storageKey])

  if (submitted) {
    return <div className="bg-accent/50 border border-border rounded-lg p-6 text-center"><p className="text-foreground font-heading text-lg font-semibold">{t.thanks}</p></div>
  }

  const Pills = ({ field, opts }: { field: string; opts: string[] }) => (
    <div className="flex flex-wrap gap-2">
      {opts.map(opt => (
        <button key={opt} onClick={() => setAnswers(a => ({ ...a, [field]: opt }))}
          className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${answers[field] === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
      ))}
    </div>
  )

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground">{t.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
      </div>

      <div className="space-y-3"><p className="font-medium text-foreground">{t.q1}</p><Pills field="favorite_method" opts={methods} /></div>
      <div className="space-y-3"><p className="font-medium text-foreground">{t.q2}</p><Pills field="least_favorite" opts={methods} /></div>
      <div className="space-y-3"><p className="font-medium text-foreground">{t.q3}</p><Pills field="most_effective" opts={methods} /></div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q4}</p>
        <div className="flex gap-2 flex-wrap">
          {pace.map(opt => (
            <button key={opt} onClick={() => setAnswers(a => ({ ...a, pace: opt }))}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${answers.pace === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
          ))}
        </div>
      </div>

      <div className="space-y-3"><p className="font-medium text-foreground">{t.q5}</p><Pills field="learned_useful" opts={learned} /></div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q6}</p>
        <textarea className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows={3} maxLength={500} placeholder={t.notes} value={(answers.other_comments as string) || ''}
          onChange={e => setAnswers(a => ({ ...a, other_comments: e.target.value }))} />
      </div>

      <button onClick={handleSubmit} disabled={submitting || !isComplete}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90">
        {submitting ? t.sending : t.send}
      </button>
    </div>
  )
}
