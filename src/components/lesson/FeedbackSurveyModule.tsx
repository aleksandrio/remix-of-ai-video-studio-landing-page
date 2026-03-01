import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'

const FEEDBACK_QUESTIONS = [
  {
    id: 'rating',
    type: 'scale' as const,
    question: 'Jak oceniasz dzisiejsze zajęcia?',
    min: 1,
    max: 5,
    labels: { 1: 'Słabo', 3: 'OK', 5: 'Super' },
  },
  { id: 'best', type: 'text' as const, question: 'Co było najciekawsze?' },
  { id: 'improve', type: 'text' as const, question: 'Co można poprawić?' },
]

interface Props {
  lessonSlug: string
  sessionId: string
}

export function FeedbackSurveyModule({ lessonSlug, sessionId }: Props) {
  const storageKey = `feedback_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (!answers.rating) return
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
  }, [answers, lessonSlug, sessionId, storageKey])

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
        <p className="text-muted-foreground text-sm mt-1">
          Ankieta anonimowa — nie wpisuj imienia, nazwiska ani danych wrażliwych.
        </p>
      </div>

      {FEEDBACK_QUESTIONS.map((q) => (
        <div key={q.id} className="space-y-3">
          <p className="font-medium text-foreground">{q.question}</p>
          {q.type === 'scale' && (
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i).map((v) => (
                <button
                  key={v}
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: v }))}
                  className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                    answers[q.id] === v
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/50'
                  }`}
                >
                  {v}
                </button>
              ))}
              <div className="w-full flex justify-between text-xs text-muted-foreground mt-1">
                <span>{q.labels?.[q.min]}</span>
                <span>{q.labels?.[q.max]}</span>
              </div>
            </div>
          )}
          {q.type === 'text' && (
            <textarea
              className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
              maxLength={500}
              placeholder="Twoja odpowiedź..."
              value={(answers[q.id] as string) || ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting || !answers.rating}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90"
      >
        {submitting ? 'Wysyłanie...' : 'Wyślij feedback'}
      </button>
    </div>
  )
}
