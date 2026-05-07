import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useT } from '@/lib/i18n'

const FAV_OPTIONS = {
  pl: ['Korepetytor z angielskiego', 'Egzaminator wiedzy', 'Tłumacz trudnych tematów', 'Trener pisania', 'Doradca naukowy', 'Motywator do nauki'],
  en: ['English tutor', 'Knowledge examiner', 'Hard-topic translator', 'Writing coach', 'Study advisor', 'Study motivator'],
}
const WILL_USE = {
  pl: ['Tak, od razu!', 'Może spróbuję', 'Muszę się zastanowić', 'Raczej nie'],
  en: ['Yes, right away!', 'Maybe I will try', 'I need to think about it', 'Probably not'],
}
const PACE = { pl: ['Za szybko', 'W sam raz', 'Za wolno'], en: ['Too fast', 'Just right', 'Too slow'] }
const USEFUL = {
  pl: ['Tak, na pewno!', 'Raczej tak', 'Nie jestem pewien/a', 'Raczej nie'],
  en: ['Yes, definitely!', 'Probably yes', "I'm not sure", 'Probably not'],
}

const LESSON_SLUG = '3-asystenci-ai'
interface Props { sessionId: string }

export function FeedbackSurveyAsystenci({ sessionId }: Props) {
  const fav = useT(FAV_OPTIONS); const will = useT(WILL_USE); const pace = useT(PACE); const useful = useT(USEFUL)
  const t = useT({
    pl: {
      thanks: 'Dziękuję za feedback! 🙏', title: 'Feedback po zajęciach',
      sub: 'Ankieta anonimowa — nie wpisuj danych osobowych.',
      q1: 'Który asystent najbardziej Ci się podoba? (zaznacz wszystkie)',
      q2: 'Czy użyjesz asystenta AI do nauki?',
      q3: 'Tempo zajęć:',
      q4: 'Czy nauczyłeś/aś się czegoś przydatnego?',
      q5: 'Czego jeszcze chciałbyś się nauczyć o AI?',
      placeholder: 'Twoje pomysły...', submit: 'Wyślij feedback', sending: 'Wysyłanie...',
    },
    en: {
      thanks: 'Thanks for the feedback! 🙏', title: 'Post-class feedback',
      sub: "Anonymous survey — don't enter personal data.",
      q1: 'Which assistant do you like most? (select all)',
      q2: 'Will you use an AI assistant for learning?',
      q3: 'Pace of the class:',
      q4: 'Did you learn something useful?',
      q5: 'What else would you like to learn about AI?',
      placeholder: 'Your ideas...', submit: 'Send feedback', sending: 'Sending...',
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

  const isComplete = ((answers.favorite_assistant as string[])?.length || 0) > 0 && answers.will_use && answers.pace && answers.learned_useful

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

  if (submitted) return <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
    <p className="text-foreground font-heading text-lg font-semibold">{t.thanks}</p>
  </div>

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground">{t.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{t.sub}</p>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q1}</p>
        <div className="flex flex-wrap gap-2">
          {fav.map((opt, i) => (
            <button key={i} onClick={() => toggleMulti('favorite_assistant', FAV_OPTIONS.pl[i])}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.favorite_assistant as string[]) || []).includes(FAV_OPTIONS.pl[i]) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q2}</p>
        <div className="flex flex-wrap gap-2">
          {will.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(a => ({ ...a, will_use: WILL_USE.pl[i] }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${answers.will_use === WILL_USE.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q3}</p>
        <div className="flex gap-2 flex-wrap">
          {pace.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(a => ({ ...a, pace: PACE.pl[i] }))}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${answers.pace === PACE.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-foreground">{t.q4}</p>
        <div className="flex gap-2 flex-wrap">
          {useful.map((opt, i) => (
            <button key={i} onClick={() => setAnswers(a => ({ ...a, learned_useful: USEFUL.pl[i] }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${answers.learned_useful === USEFUL.pl[i] ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>
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
