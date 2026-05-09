import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResults2 } from './LiveStartResults2'
import { useT } from '@/lib/i18n'

const MOTIVATION = {
  pl: ['Bardzo mi zależy', 'Zależy mi, ale mogłoby być lepiej', 'Uczę się bo muszę', 'Szczerze? Słabo'],
  en: ['I really care', 'I care, could be better', 'I study because I have to', 'Honestly? Not much'],
}
const METHODS_KNOWN = {
  pl: ['Mapy myśli', 'Fiszki', 'Quizy / testy', 'Podcasty / słuchanie', 'Streszczenia i notatki', 'Powtórki rozłożone w czasie', 'Uczenie innych', 'Żadna z powyższych'],
  en: ['Mind maps', 'Flashcards', 'Quizzes / tests', 'Podcasts / listening', 'Summaries & notes', 'Spaced repetition', 'Teaching others', 'None of the above'],
}
const CURRENT_METHOD = {
  pl: ['Czytam notatki / podręcznik', 'Oglądam filmy (YT itp.)', 'Robię fiszki', 'Rozwiązuję zadania / quizy', 'Słucham podcastów / audio', 'Korzystam z AI', 'Inne'],
  en: ['I reread notes / textbook', 'I watch videos (YT etc.)', 'I make flashcards', 'I solve exercises / quizzes', 'I listen to podcasts / audio', 'I use AI', 'Other'],
}
const STUDY_TIME = { pl: ['< 30 min dziennie', '30–60 min', '1–2h', '> 2h'], en: ['< 30 min/day', '30–60 min', '1–2h', '> 2h'] }

interface Props { lessonSlug: string; sessionId: string }

export function StartSurveyModule2({ lessonSlug, sessionId }: Props) {
  const storageKey = `start_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const t = useT({
    pl: { thanks: 'Dzięki! ✅', title: 'Szybka ankieta na start (anonimowa)', sub: 'Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.',
      q1: 'Jak bardzo zależy Ci na nauce?', q2: 'Jakie metody uczenia się znasz? (zaznacz wszystkie)', q3: 'Jak najczęściej się uczysz? (zaznacz wszystkie)',
      q4: 'Ile czasu dziennie poświęcasz na naukę (poza szkołą)?', q5: 'Jak oceniasz skuteczność swojego uczenia się? (1–5)',
      low: 'Słabo', high: 'Super', q6: 'Co jest dla Ciebie najtrudniejsze w nauce?', placeholder: 'Twoja odpowiedź (opcjonalne)...',
      sending: 'Wysyłanie...', send: 'Wyślij odpowiedzi' },
    en: { thanks: 'Thanks! ✅', title: 'Quick start survey (anonymous)', sub: 'Before we start — 30 seconds. Do not enter personal data.',
      q1: 'How much do you care about learning?', q2: 'Which study methods do you know? (select all)', q3: 'How do you usually study? (select all)',
      q4: 'How much time do you study daily (outside school)?', q5: 'How effective do you think your learning is? (1–5)',
      low: 'Poor', high: 'Great', q6: 'What is hardest for you in learning?', placeholder: 'Your answer (optional)...',
      sending: 'Sending...', send: 'Submit answers' },
  })
  const motivation = useT(MOTIVATION), methodsKnown = useT(METHODS_KNOWN), currentMethod = useT(CURRENT_METHOD), studyTime = useT(STUDY_TIME)

  const toggleMulti = (field: string, val: string) => {
    setAnswers((a) => { const arr = (a[field] as string[]) || []; return { ...a, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] } })
  }

  const isComplete = answers.motivation && ((answers.methods_known as string[])?.length || 0) > 0 && ((answers.current_method as string[])?.length || 0) > 0 && answers.study_time && answers.effectiveness

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
        <LiveStartResults2 lessonSlug={lessonSlug} sessionId={sessionId} />
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
            {motivation.map(opt => (
              <button key={opt} onClick={() => setAnswers(a => ({ ...a, motivation: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.motivation === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q2}</p>
          <div className="flex flex-wrap gap-2">
            {methodsKnown.map(opt => (
              <button key={opt} onClick={() => toggleMulti('methods_known', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.methods_known as string[]) || []).includes(opt) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q3}</p>
          <div className="flex flex-wrap gap-2">
            {currentMethod.map(opt => (
              <button key={opt} onClick={() => toggleMulti('current_method', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${((answers.current_method as string[]) || []).includes(opt) ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q4}</p>
          <div className="flex flex-col gap-2">
            {studyTime.map(opt => (
              <button key={opt} onClick={() => setAnswers(a => ({ ...a, study_time: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${answers.study_time === opt ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium text-foreground">{t.q5}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{t.low}</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button key={v} onClick={() => setAnswers(a => ({ ...a, effectiveness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${answers.effectiveness === v ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/50'}`}>{v}</button>
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

      <LiveStartResults2 lessonSlug={lessonSlug} sessionId={sessionId} />
    </div>
  )
}
