import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { StartSurveyModule } from '@/components/lesson/StartSurveyModule'
import { FeedbackSurveyModule } from '@/components/lesson/FeedbackSurveyModule'
import { ThemeToggle } from '@/components/ThemeToggle'

interface LessonConfig {
  lesson_slug: string
  title: string
  start_survey_enabled: boolean
  feedback_survey_enabled: boolean
}

interface Session {
  id: string
  name: string
  status: string
}

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const [lesson, setLesson] = useState<LessonConfig | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    async function load() {
      const { data: lessonData } = await supabase
        .from('lesson_configs')
        .select('*')
        .eq('lesson_slug', slug)
        .single()

      if (!lessonData) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setLesson(lessonData as unknown as LessonConfig)

      const { data: sessionData } = await supabase
        .from('survey_sessions')
        .select('*')
        .eq('lesson_slug', slug)
        .eq('status', 'active')
        .single()

      if (sessionData) setSession(sessionData as unknown as Session)
      setLoading(false)
    }

    load()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-3xl font-bold text-foreground">Nie znaleziono lekcji</h1>
          <p className="text-muted-foreground">Sprawdź, czy link jest poprawny.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-editorial uppercase text-muted-foreground">AI w szkole</p>
            <h1 className="font-heading text-lg font-bold text-foreground">{lesson?.title}</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {lesson?.start_survey_enabled && session && (
          <StartSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}

        {lesson?.feedback_survey_enabled && session && (
          <FeedbackSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}

        {!lesson?.start_survey_enabled && !lesson?.feedback_survey_enabled && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Brak aktywnych modułów dla tej lekcji.</p>
          </div>
        )}
      </main>
    </div>
  )
}
