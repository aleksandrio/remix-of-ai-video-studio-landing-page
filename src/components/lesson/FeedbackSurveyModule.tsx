import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

const BEST_WORKED_OPTIONS = ['Gemini', 'Nano Banana', 'Veo', 'Lyra/Lyria', 'Gotowe prompty do kopiowania', 'Ankieta live']
const PACE_OPTIONS = ['Za szybko', 'W sam raz', 'Za wolno']

interface Props {
  lessonSlug: string
  sessionId: string
}

export function FeedbackSurveyModule({ lessonSlug, sessionId }: Props) {
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

  const isComplete = ((answers.best_worked as string[])?.length || 0) > 0 && answers.pace && answers.rating

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

      {/* best_worked multi */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Co działało najlepiej? (zaznacz wszystkie)</p>
        <div className="flex flex-wrap gap-2">
          {BEST_WORKED_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleMulti('best_worked', opt)}
              className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                ((answers.best_worked as string[]) || []).includes(opt)
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* liked_most */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Co najbardziej Ci się podobało?</p>
        <input
          value={(answers.liked_most as string) || ''}
          onChange={(e) => setAnswers((a) => ({ ...a, liked_most: e.target.value }))}
          className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          maxLength={300}
          placeholder="Krótka odpowiedź..."
        />
      </div>

      {/* want_more */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Czego chcesz więcej?</p>
        <input
          value={(answers.want_more as string) || ''}
          onChange={(e) => setAnswers((a) => ({ ...a, want_more: e.target.value }))}
          className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          maxLength={300}
          placeholder="Krótka odpowiedź..."
        />
      </div>

      {/* pace */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Tempo zajęć:</p>
        <div className="flex gap-2 flex-wrap">
          {PACE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setAnswers((a) => ({ ...a, pace: opt }))}
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

      {/* rating */}
      <div className="space-y-3">
        <p className="font-medium text-foreground">Ocena zajęć (1–5)</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Słabo</span>
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => setAnswers((a) => ({ ...a, rating: v }))}
              className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                answers.rating === v
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-foreground hover:border-primary/50'
              }`}
            >
              {v}
            </button>
          ))}
          <span className="text-xs text-muted-foreground whitespace-nowrap">Super</span>
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
          onChange={(e) => setAnswers((a) => ({ ...a, other_comments: e.target.value }))}
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
