import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle, useT } from '@/lib/i18n'
import { StartSurveyMetody } from '@/components/metody-nauki/StartSurveyMetody'
import { FeedbackSurveyMetody } from '@/components/metody-nauki/FeedbackSurveyMetody'
import { MethodCard } from '@/components/metody-nauki/MethodCard'
import { NotebookToolCard } from '@/components/metody-nauki/NotebookToolCard'
import { EXAMPLE_SOURCE_TEXT } from '@/data/exampleSource'
import { CopyButton } from '@/components/ui/CopyButton'
import { metodyContent } from '@/data/translations/metodyNauki'

const LESSON_SLUG = '2-metody-nauki'

export default function MetodyNaukiPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useT(metodyContent)

  useEffect(() => {
    async function load() {
      let { data: sessionData } = await supabase
        .from('survey_sessions')
        .select('*')
        .eq('lesson_slug', LESSON_SLUG)
        .eq('status', 'active')
        .maybeSingle()

      if (!sessionData) {
        const name = `Auto: ${new Date().toLocaleString('pl')}`
        const { data: newSession } = await supabase
          .from('survey_sessions')
          .insert({ lesson_slug: LESSON_SLUG, name, status: 'active' })
          .select()
          .single()
        sessionData = newSession
      }

      if (sessionData) setSessionId(sessionData.id)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.brand}</p>
            <h1 className="font-heading text-lg font-bold text-foreground">{t.pageTitle}</h1>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {sessionId && <StartSurveyMetody sessionId={sessionId} />}

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.introTitle}</h2>
          <p className="text-sm text-foreground leading-relaxed">{t.introP1}</p>
          <p className="text-sm text-foreground leading-relaxed">{t.introP2}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.weakLabel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.weakDesc}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.strongLabel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.strongDesc}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.methodsTitle}</h2>
          {t.methods.map((m, i) => (
            <MethodCard
              key={i}
              emoji={m.emoji}
              title={m.title}
              subtitle={m.subtitle}
              description={m.description}
              details={m.details}
            />
          ))}
        </section>

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.addTitle}</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.addStep1Title}</p>
              <p className="text-sm text-foreground leading-relaxed">{t.addStep1Body}</p>
              <p className="text-xs text-muted-foreground">{t.addStep1Note}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.addStep3Title}</p>
              <p className="text-sm text-foreground leading-relaxed">{t.addStep3Body}</p>
              <p className="text-xs text-muted-foreground">{t.addStep3Note}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.addStep4Title}</p>
              <p className="text-sm text-foreground leading-relaxed">{t.addStep4Body}</p>
              <p className="text-xs text-muted-foreground">{t.addStep4Note}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground">{t.addStep2Title}</p>
              <CopyButton text={EXAMPLE_SOURCE_TEXT} />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{t.addStep2Body}</p>
            <p className="text-xs text-muted-foreground">{t.addStep2Note}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.toolsTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.toolsIntro}</p>
          {t.tools.map((tool, i) => (
            <NotebookToolCard
              key={i}
              emoji={tool.emoji}
              title={tool.title}
              description={tool.description}
              details={tool.details}
            />
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.otherToolsTitle}</h2>
          <p className="text-xs text-muted-foreground">{t.otherToolsNote}</p>
          {t.otherTools.map((tool, i) => (
            <NotebookToolCard
              key={i}
              emoji={tool.emoji}
              title={tool.title}
              description={tool.description}
              details={tool.details}
            />
          ))}
        </section>

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.previewTitle}</h2>
          <p className="text-sm text-foreground leading-relaxed">{t.previewIntro}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.previewProsLabel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.previewProsBody}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.previewConsLabel}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.previewConsBody}</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">{t.goldenRule}</p>
          </div>
        </section>

        {sessionId && <FeedbackSurveyMetody sessionId={sessionId} />}
      </main>
    </div>
  )
}
