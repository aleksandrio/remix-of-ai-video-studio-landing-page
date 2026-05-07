import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { StartSurveyModule } from '@/components/lesson/StartSurveyModule'
import { StartSurveyModule2 } from '@/components/lesson/StartSurveyModule2'
import { FeedbackSurveyModule } from '@/components/lesson/FeedbackSurveyModule'
import { FeedbackSurveyModule2 } from '@/components/lesson/FeedbackSurveyModule2'
import { ToolSection } from '@/components/lesson/ToolSection'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/lib/i18n'
import { LESSON_TOOLS_MAP, LESSON_TOOLS } from '@/data/lessonTools'

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
        .maybeSingle()

      if (!lessonData) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setLesson(lessonData as unknown as LessonConfig)

      // Find active session
      let { data: sessionData } = await supabase
        .from('survey_sessions')
        .select('*')
        .eq('lesson_slug', slug)
        .eq('status', 'active')
        .maybeSingle()

      // Auto-create if none exists
      if (!sessionData) {
        const name = `Auto: ${new Date().toLocaleString('pl')}`
        const { data: newSession } = await supabase
          .from('survey_sessions')
          .insert({ lesson_slug: slug, name, status: 'active' })
          .select()
          .single()
        sessionData = newSession
      }

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
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">AI w szkole</p>
            <h1 className="font-heading text-lg font-bold text-foreground">{lesson?.title}</h1>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {/* A) Start survey */}
        {lesson?.start_survey_enabled && session && (
          slug === '2-notebooklm'
            ? <StartSurveyModule2 lessonSlug={slug} sessionId={session.id} />
            : <StartSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}

        {/* B) Mini-instruction */}
        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Jak korzystać z promptów</h2>
          <ol className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Wybierz prompt</li>
            <li className="flex gap-2"><span className="font-bold text-primary">2.</span> Kliknij „Kopiuj"</li>
            <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Podmień [NAWIASY] i uruchom</li>
          </ol>
          <div className="bg-muted/50 rounded-lg p-4 space-y-1 text-xs text-muted-foreground">
            <p>⚠️ AI to asystent — nie zastępuje myślenia.</p>
            <p>⚠️ Nie wklejaj danych wrażliwych.</p>
            <p>⚠️ Jeśli używasz do szkoły — sprawdzaj fakty.</p>
          </div>
        </section>

        {/* Ethical use note — lesson 1 */}
        {slug === '1-google-intro' && (
          <section className="bg-card border border-primary/20 rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">🤝 Tworzenie z szacunkiem</h2>
            <p className="text-sm text-foreground leading-relaxed">
              Narzędzia generatywnej AI dają Ci ogromne możliwości twórcze — możesz tworzyć niesamowite grafiki, filmy i muzykę. Z taką mocą wiąże się jednak odpowiedzialność.
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Każda osoba ma prawo do swojego wizerunku. Tworzenie treści z wykorzystaniem czyjejś twarzy lub zdjęć <strong>wymaga zawsze zgody tej osoby</strong>. To nie tylko kwestia prawa — to kwestia szacunku do drugiego człowieka.
            </p>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-2 text-sm text-foreground">
              <p className="font-semibold">Co robić, gdy widzisz, że ktoś tworzy treści krzywdzące inne osoby?</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> Zareaguj — powiedz, że to nie jest OK</li>
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> Usuń takie treści, jeśli masz taką możliwość</li>
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> Zgłoś problem nauczycielowi lub innej zaufanej osobie dorosłej</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Najlepsi twórcy potrafią tworzyć rzeczy, które inspirują — nie ranią. Bądź takim twórcą. 💪
            </p>
          </section>
        )}

        {/* Possibilities section — lesson 1 */}
        {slug === '1-google-intro' && (
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-xl font-bold text-foreground">🚀 Co możesz z tym zrobić?</h2>
            <p className="text-sm text-foreground leading-relaxed">
              Narzędzia, które dziś poznasz, to nie zabawki — to profesjonalne studio multimedialne w Twojej przeglądarce. Oto kilka pomysłów, jak możesz je wykorzystać:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">🎓 W szkole</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary">•</span> Ilustracje i grafiki do prezentacji, które wyróżnią Twój projekt</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Krótkie filmy edukacyjne do projektów grupowych</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Plakaty na wydarzenia szkolne w kilka minut</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Podkład muzyczny do własnych materiałów wideo</li>
                </ul>
              </div>
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">🎥 Na własny kanał</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary">•</span> Intro i outro do filmów na YouTube czy TikToka</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Miniaturki (thumbnails), które przyciągają uwagę</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Oryginalna muzyka bez problemów z prawami autorskimi</li>
                  <li className="flex gap-2"><span className="text-primary">•</span> Wstawki wizualne i animacje, które podnoszą jakość treści</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Ludzie, którzy dziś prowadzą popularne kanały, zaczynali dokładnie od takich eksperymentów. Jedyna różnica? Oni zaczęli — a Ty właśnie zaczynasz. 🎯
            </p>
          </section>
        )}

        {/* Learning methods intro — lesson 2 */}
        {slug === '2-notebooklm' && (
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="font-heading text-xl font-bold text-foreground">🧠 Sprawdzone metody uczenia się</h2>
            <p className="text-sm text-foreground leading-relaxed">
              Zanim przejdziemy do narzędzi, warto wiedzieć <strong>dlaczego</strong> działają. Każda z funkcji NotebookLM opiera się na technikach, które naukowcy badają od dekad — i które naprawdę pomagają zapamiętywać.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">🗺️ Mapy myśli</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Łączą pojęcia w wizualną sieć zamiast liniowych notatek. Pomagają zobaczyć związki między tematami i budują głębsze zrozumienie — zamiast mechanicznego wkuwania.
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">📇 Fiszki (active recall)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pytanie → próba odpowiedzi → sprawdzenie. Ten prosty cykl zmusza mózg do aktywnego wydobywania wiedzy, co jest jedną z najskuteczniejszych technik utrwalania materiału.
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">🎧 Podcasty i słuchanie</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Uczenie się przez słuchanie aktywuje inny kanał percepcji. Możesz powtarzać materiał w drodze do szkoły, na spacerze — wtedy, kiedy czytanie jest niemożliwe.
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">❓ Quizy (self-testing)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Testowanie siebie nie służy tylko ocenianiu — to potężna metoda nauki. Quizy pomagają wykryć luki w wiedzy i wzmacniają to, co już wiesz.
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">📝 Streszczenia i notatki</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Przetwarzanie materiału własnymi słowami (lub czytanie dobrych streszczeń) pomaga wyłowić najważniejsze informacje i zorganizować wiedzę w głowie.
                </p>
              </div>

              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">🔁 Powtórki rozłożone w czasie</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Powtarzanie materiału w rosnących odstępach czasu (np. po 1, 3, 7 dniach) drastycznie zwiększa trwałość wiedzy — to tzw. <em>spaced repetition</em>.
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">
              NotebookLM łączy te metody w jednym narzędziu — i robi to automatycznie na podstawie Twoich materiałów. Zobaczmy jak. 👇
            </p>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Narzędzia</h2>
          {(slug && LESSON_TOOLS_MAP[slug] ? LESSON_TOOLS_MAP[slug] : LESSON_TOOLS).map((tool) => (
            <ToolSection key={tool.name} {...tool} />
          ))}
        </section>

        {/* D) Feedback */}
        {lesson?.feedback_survey_enabled && session && (
          slug === '2-notebooklm'
            ? <FeedbackSurveyModule2 lessonSlug={slug} sessionId={session.id} />
            : <FeedbackSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}
      </main>
    </div>
  )
}
