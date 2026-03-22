import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { LiveStartResults2 } from './LiveStartResults2'

const MOTIVATION_OPTIONS = ['Bardzo mi zależy', 'Zależy mi, ale mogłoby być lepiej', 'Uczę się bo muszę', 'Szczerze? Słabo']

const METHODS_KNOWN_OPTIONS = [
  'Mapy myśli',
  'Fiszki',
  'Quizy / testy',
  'Podcasty / słuchanie',
  'Streszczenia i notatki',
  'Powtórki rozłożone w czasie',
  'Uczenie innych',
  'Żadna z powyższych',
]

const CURRENT_METHOD_OPTIONS = [
  'Czytam notatki / podręcznik',
  'Oglądam filmy (YT itp.)',
  'Robię fiszki',
  'Rozwiązuję zadania / quizy',
  'Słucham podcastów / audio',
  'Korzystam z AI',
  'Inne',
]

const STUDY_TIME_OPTIONS = ['< 30 min dziennie', '30–60 min', '1–2h', '> 2h']

interface Props {
  lessonSlug: string
  sessionId: string
}

export function StartSurveyModule2({ lessonSlug, sessionId }: Props) {
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
    answers.motivation &&
    ((answers.methods_known as string[])?.length || 0) > 0 &&
    ((answers.current_method as string[])?.length || 0) > 0 &&
    answers.study_time &&
    answers.effectiveness

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
        <LiveStartResults2 lessonSlug={lessonSlug} sessionId={sessionId} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground">Szybka ankieta na start (anonimowa)</h3>
          <p className="text-muted-foreground text-sm mt-1">Zanim zaczniemy — 30 sekund. Nie wpisuj danych osobowych.</p>
        </div>

        {/* 1) motivation */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak bardzo zależy Ci na nauce?</p>
          <div className="flex flex-col gap-2">
            {MOTIVATION_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(a => ({ ...a, motivation: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.motivation === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2) methods_known */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jakie metody uczenia się znasz? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {METHODS_KNOWN_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => toggleMulti('methods_known', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.methods_known as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3) current_method */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak najczęściej się uczysz? (zaznacz wszystkie)</p>
          <div className="flex flex-wrap gap-2">
            {CURRENT_METHOD_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => toggleMulti('current_method', opt)}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all ${
                  ((answers.current_method as string[]) || []).includes(opt)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 4) study_time */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Ile czasu dziennie poświęcasz na naukę (poza szkołą)?</p>
          <div className="flex flex-col gap-2">
            {STUDY_TIME_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers(a => ({ ...a, study_time: opt }))}
                className={`text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  answers.study_time === opt
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 5) effectiveness - scale 1-5 */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Jak oceniasz skuteczność swojego uczenia się? (1–5)</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">Słabo</span>
            {[1, 2, 3, 4, 5].map(v => (
              <button
                key={v}
                onClick={() => setAnswers(a => ({ ...a, effectiveness: v }))}
                className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all ${
                  answers.effectiveness === v
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

        {/* 6) open_answer */}
        <div className="space-y-3">
          <p className="font-medium text-foreground">Co jest dla Ciebie najtrudniejsze w nauce?</p>
          <textarea
            className="w-full border border-border bg-background text-foreground rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
            maxLength={500}
            placeholder="Twoja odpowiedź (opcjonalne)..."
            value={(answers.open_answer as string) || ''}
            onChange={e => setAnswers(a => ({ ...a, open_answer: e.target.value }))}
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

      <LiveStartResults2 lessonSlug={lessonSlug} sessionId={sessionId} />
    </div>
  )
}
