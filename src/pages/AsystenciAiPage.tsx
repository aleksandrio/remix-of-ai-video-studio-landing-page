import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle, useT } from '@/lib/i18n'
import { StartSurveyAsystenci } from '@/components/asystenci-ai/StartSurveyAsystenci'
import { FeedbackSurveyAsystenci } from '@/components/asystenci-ai/FeedbackSurveyAsystenci'
import { AssistantCard } from '@/components/asystenci-ai/AssistantCard'
import { SubjectAssistants } from '@/components/asystenci-ai/klasy-8/SubjectAssistants'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { asystenciContent } from '@/data/translations/asystenciAi'

const LESSON_SLUG = '3-asystenci-ai'

function ExampleAssistantsSection() {
  const [open, setOpen] = useState(false)
  const t = useT(asystenciContent)

  return (
    <section className="space-y-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left"
      >
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">{t.exampleSectionTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.exampleSectionDesc}</p>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      {open && (
        <div className="space-y-4">
          {t.assistants.map((a, i) => (
            <AssistantCard
              key={i}
              emoji={a.emoji}
              name={a.name}
              platform={a.platform}
              platformLink={a.platformLink}
              description={a.description}
              setupSteps={a.setupSteps}
              prompts={a.prompts}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function AsystenciAiPage() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const t = useT(asystenciContent)

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
        {sessionId && <StartSurveyAsystenci sessionId={sessionId} />}

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.introTitle}</h2>
          <p className="text-sm text-foreground leading-relaxed">{t.introP1}</p>
          <p className="text-sm text-foreground leading-relaxed">
            {t.introP2Pre}<strong>{t.introP2Bold}</strong>{t.introP2Post}
          </p>
          <div className="bg-muted/40 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">{t.whatIsLabel}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.whatIsBodyPre}<strong>{t.whatIsBodyBold}</strong>{t.whatIsBodyPost}
            </p>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.setupTitle}</h2>

          <div className="bg-muted/40 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">{t.setupPath}</p>
            <ol className="space-y-1.5 text-xs text-muted-foreground">
              {t.setupSteps.map((s, i) => (
                <li key={i} className="flex gap-2"><span className="font-bold text-primary">{i + 1}.</span> {s}</li>
              ))}
            </ol>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">{t.fiveElementsLabel}</p>
            <ol className="space-y-2 text-sm text-foreground">
              {t.fiveElements.map((el, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-primary">{i + 1}.</span>{' '}
                  <span><strong>{el.name}</strong> {el.desc}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>{t.proTipBold}</strong>{t.proTipPost}
            </p>
          </div>
        </section>

        <SubjectAssistants />

        <ExampleAssistantsSection />

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.rulesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.doLabel}</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {t.doItems.map((it, i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary">•</span> {it}</li>
                ))}
              </ul>
            </div>
            <div className="bg-muted/40 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">{t.dontLabel}</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {t.dontItems.map((it, i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary">•</span> {it}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <strong>{t.goldenRuleBold}</strong>{t.goldenRulePost}
            </p>
          </div>
        </section>

        {sessionId && <FeedbackSurveyAsystenci sessionId={sessionId} />}
      </main>
    </div>
  )
}
