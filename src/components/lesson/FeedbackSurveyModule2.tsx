import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

const METHODS_OPTIONS = [
  'Mapy myśli',
  'Fiszki',
  'Podcasty / Audio Overview',
  'Quizy / testy',
  'Streszczenia i notatki',
  'Powtórki rozłożone w czasie',
]
const PACE_OPTIONS = ['Za szybko', 'W sam raz', 'Za wolno']

interface Props {
  lessonSlug: string
  sessionId: string
}

export function FeedbackSurveyModule2({ lessonSlug, sessionId }: Props) {
  const storageKey = `feedback_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitting, setSubmitting] = useState(false)

  const toggleMulti = (field: string, val: string) => {
    setAnswers((a) => {
      const arr = (a[field] as string[]) || []
      return { ...a, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] }
    })
  }

  const isComplete = answers.favorite_method && answers.least_favorite && answers.most_effective && answers.pace && answers.learned_useful

  const handleSubmit = useCallback(async () => {
    if (!isComplete) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('survey_responses').insert([{
        lesson_slug: lessonSlug,
        session_id: sessionId,
        survey_type: 'feedback',
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
      <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
        <p className="text-foreground font-heading text-lg font-semibold">Dziękuję za feedback! 🙏</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
      <div>
        <h3 className="font-heading text-xl font-bold text-foreground">Feedback po zajęciach</h3>
        <p className="text-muted-foreground text-sm mt-1">Ankieta anonimowa — nie wpisuj danych osobowych.</p>
      </div>

      {/* favorite_method */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Która metoda uczenia się najbardziej Ci się podoba?</p>
        <div className="flex flex-wrap gap-2">
          {METHODS_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(a => ({ ...a, favorite_method: opt }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                answers.favorite_method === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* least_favorite */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Która metoda najmniej Ci odpowiada?</p>
        <div className="flex flex-wrap gap-2">
          {METHODS_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(a => ({ ...a, least_favorite: opt }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                answers.least_favorite === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* most_effective */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Która metoda wg Ciebie może przynieść najlepsze efekty?</p>
        <div className="flex flex-wrap gap-2">
          {METHODS_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(a => ({ ...a, most_effective: opt }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                answers.most_effective === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>


      {/* pace */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Tempo zajęć:</p>
        <div className="flex gap-2 flex-wrap">
          {PACE_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(a => ({ ...a, pace: opt }))}
              className={`px-4 py-3 rounded-lg border-2 transition-all ${
                answers.pace === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* learned_useful */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Czy nauczyłeś/aś się czegoś, co przyda Ci się w nauce?</p>
        <div className="flex gap-2 flex-wrap">
          {['Tak, na pewno!', 'Raczej tak', 'Nie jestem pewien/a', 'Raczej nie'].map(opt => (
            <button
              key={opt}
              onClick={() => setAnswers(a => ({ ...a, learned_useful: opt }))}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                answers.learned_useful === opt
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* other_comments */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Inne uwagi (opcjonalne)</p>
        <textarea
          className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          rows={3}
          maxLength={500}
          placeholder="Twoje uwagi..."
          value={(answers.other_comments as string) || ''}
          onChange={e => setAnswers(a => ({ ...a, other_comments: e.target.value }))}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || !isComplete}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90"
      >
        {submitting ? 'Wysyłanie...' : 'Wyślij feedback'}
      </button>
    </div>
  )
}
