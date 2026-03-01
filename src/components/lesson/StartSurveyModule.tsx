import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResults } from './LiveStartResults'

const START_QUESTIONS = [
  {
    id: 'ai_knowledge',
    type: 'scale' as const,
    question: 'Jak oceniasz swoją znajomość sztucznej inteligencji?',
    min: 1,
    max: 5,
    labels: { 1: 'Żadna', 3: 'Średnia', 5: 'Zaawansowana' },
  },
  {
    id: 'ai_usage',
    type: 'choice' as const,
    question: 'Czy korzystałeś/aś wcześniej z narzędzi AI (np. ChatGPT)?',
    options: ['Nigdy', 'Kilka razy', 'Regularnie'],
  },
]

interface Props {
  lessonSlug: string
  sessionId: string
}

export function StartSurveyModule({ lessonSlug, sessionId }: Props) {
  const storageKey = `start_survey_${lessonSlug}_${sessionId}`
  const [submitted, setSubmitted] = useState(() => localStorage.getItem(storageKey) === '1')
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    if (Object.keys(answers).length < START_QUESTIONS.length) return
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
  }, [answers, lessonSlug, sessionId, storageKey])

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-accent/50 border border-border rounded-lg p-6 text-center">
          <p className="text-foreground font-heading text-lg font-semibold">Dziękuję za wypełnienie ankiety! ✅</p>
          <p className="text-muted-foreground text-sm mt-1">Wyniki na żywo poniżej.</p>
        </div>
        <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} questions={START_QUESTIONS} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Ankieta startowa</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Ankieta anonimowa — nie wpisuj imienia, nazwiska ani danych wrażliwych.
          </p>
        </div>

        {START_QUESTIONS.map((q) => (
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
            {q.type === 'choice' && (
              <div className="flex flex-col gap-2">
                {q.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                    className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                      answers[q.id] === opt
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border bg-background text-foreground hover:border-primary/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitting || Object.keys(answers).length < START_QUESTIONS.length}
          className="w-full py-3 px-6 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all disabled:opacity-50 hover:opacity-90"
        >
          {submitting ? 'Wysyłanie...' : 'Wyślij odpowiedzi'}
        </button>
      </div>

      <LiveStartResults lessonSlug={lessonSlug} sessionId={sessionId} questions={START_QUESTIONS} />
    </div>
  )
}
