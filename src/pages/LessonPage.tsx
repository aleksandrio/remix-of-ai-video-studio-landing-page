import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { StartSurveyModule } from '@/components/lesson/StartSurveyModule'
import { StartSurveyModule2 } from '@/components/lesson/StartSurveyModule2'
import { FeedbackSurveyModule } from '@/components/lesson/FeedbackSurveyModule'
import { FeedbackSurveyModule2 } from '@/components/lesson/FeedbackSurveyModule2'
import { ToolSection } from '@/components/lesson/ToolSection'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle, useT, useLang } from '@/lib/i18n'
import { LESSON_TOOLS_MAP, LESSON_TOOLS } from '@/data/lessonTools'
import { LESSON_TOOLS_MAP_EN, LESSON_TOOLS_EN } from '@/data/lessonToolsEn'

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

const LESSON_TITLES: Record<string, { pl: string; en: string }> = {
  '1-google-intro': { pl: 'Lekcja 1 — Google AI: tworzenie obrazów, filmów i muzyki', en: 'Lesson 1 — Google AI: creating images, videos and music' },
  '2-notebooklm': { pl: 'Lekcja 2 — NotebookLM: nauka z własnych materiałów', en: 'Lesson 2 — NotebookLM: studying from your own materials' },
  '3-ai-english': { pl: 'Lekcja 3 — Asystenci głosowi AI do nauki języków', en: 'Lesson 3 — AI voice assistants for language learning' },
}

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const [lesson, setLesson] = useState<LessonConfig | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const t = useT({
    pl: { brand: 'AI w szkole', notFound: 'Nie znaleziono lekcji', notFoundSub: 'Sprawdź, czy link jest poprawny.', howTitle: 'Jak korzystać z promptów', s1: 'Wybierz prompt', s2: 'Kliknij „Kopiuj"', s3: 'Podmień [NAWIASY] i uruchom', w1: '⚠️ AI to asystent — nie zastępuje myślenia.', w2: '⚠️ Nie wklejaj danych wrażliwych.', w3: '⚠️ Jeśli używasz do szkoły — sprawdzaj fakty.', tools: 'Narzędzia' },
    en: { brand: 'AI in school', notFound: 'Lesson not found', notFoundSub: 'Check if the link is correct.', howTitle: 'How to use the prompts', s1: 'Pick a prompt', s2: 'Click "Copy"', s3: 'Replace [BRACKETS] and run', w1: '⚠️ AI is an assistant — it does not replace thinking.', w2: '⚠️ Do not paste sensitive data.', w3: '⚠️ If you use it for school — verify the facts.', tools: 'Tools' },
  })

  const ethics = useT({
    pl: {
      title: '🤝 Tworzenie z szacunkiem',
      p1: 'Narzędzia generatywnej AI dają Ci ogromne możliwości twórcze — możesz tworzyć niesamowite grafiki, filmy i muzykę. Z taką mocą wiąże się jednak odpowiedzialność.',
      p2pre: 'Każda osoba ma prawo do swojego wizerunku. Tworzenie treści z wykorzystaniem czyjejś twarzy lub zdjęć ',
      p2bold: 'wymaga zawsze zgody tej osoby',
      p2post: '. To nie tylko kwestia prawa — to kwestia szacunku do drugiego człowieka.',
      reactTitle: 'Co robić, gdy widzisz, że ktoś tworzy treści krzywdzące inne osoby?',
      r1: 'Zareaguj — powiedz, że to nie jest OK',
      r2: 'Usuń takie treści, jeśli masz taką możliwość',
      r3: 'Zgłoś problem nauczycielowi lub innej zaufanej osobie dorosłej',
      footer: 'Najlepsi twórcy potrafią tworzyć rzeczy, które inspirują — nie ranią. Bądź takim twórcą. 💪',
    },
    en: {
      title: '🤝 Create with respect',
      p1: 'Generative AI tools give you huge creative power — you can make amazing graphics, films and music. With great power comes responsibility.',
      p2pre: 'Every person has a right to their own image. Creating content using someone\'s face or photos ',
      p2bold: 'always requires that person\'s consent',
      p2post: '. It\'s not only a legal matter — it\'s about respect for another human being.',
      reactTitle: 'What to do when you see someone creating content that hurts others?',
      r1: 'Speak up — say it\'s not OK',
      r2: 'Remove such content if you can',
      r3: 'Report the problem to a teacher or another trusted adult',
      footer: 'The best creators make things that inspire — not hurt. Be that kind of creator. 💪',
    },
  })

  const possibilities = useT({
    pl: {
      title: '🚀 Co możesz z tym zrobić?',
      intro: 'Narzędzia, które dziś poznasz, to nie zabawki — to profesjonalne studio multimedialne w Twojej przeglądarce. Oto kilka pomysłów, jak możesz je wykorzystać:',
      schoolLabel: '🎓 W szkole',
      schoolItems: [
        'Ilustracje i grafiki do prezentacji, które wyróżnią Twój projekt',
        'Krótkie filmy edukacyjne do projektów grupowych',
        'Plakaty na wydarzenia szkolne w kilka minut',
        'Podkład muzyczny do własnych materiałów wideo',
      ],
      channelLabel: '🎥 Na własny kanał',
      channelItems: [
        'Intro i outro do filmów na YouTube czy TikToka',
        'Miniaturki (thumbnails), które przyciągają uwagę',
        'Oryginalna muzyka bez problemów z prawami autorskimi',
        'Wstawki wizualne i animacje, które podnoszą jakość treści',
      ],
      footer: 'Ludzie, którzy dziś prowadzą popularne kanały, zaczynali dokładnie od takich eksperymentów. Jedyna różnica? Oni zaczęli — a Ty właśnie zaczynasz. 🎯',
    },
    en: {
      title: '🚀 What can you do with this?',
      intro: 'The tools you\'ll learn today are not toys — they\'re a professional multimedia studio in your browser. Here are a few ideas of how to use them:',
      schoolLabel: '🎓 At school',
      schoolItems: [
        'Illustrations and graphics for presentations that make your project stand out',
        'Short educational films for group projects',
        'Posters for school events in minutes',
        'Background music for your own video materials',
      ],
      channelLabel: '🎥 For your own channel',
      channelItems: [
        'Intros and outros for YouTube or TikTok videos',
        'Eye-catching thumbnails',
        'Original music without copyright issues',
        'Visual inserts and animations that raise the quality of your content',
      ],
      footer: 'The people running popular channels today started with exactly these kinds of experiments. The only difference? They started — and you\'re starting now. 🎯',
    },
  })

  const methods = useT({
    pl: {
      title: '🧠 Sprawdzone metody uczenia się',
      intro: <>Zanim przejdziemy do narzędzi, warto wiedzieć <strong>dlaczego</strong> działają. Każda z funkcji NotebookLM opiera się na technikach, które naukowcy badają od dekad — i które naprawdę pomagają zapamiętywać.</>,
      items: [
        { label: '🗺️ Mapy myśli', desc: 'Łączą pojęcia w wizualną sieć zamiast liniowych notatek. Pomagają zobaczyć związki między tematami i budują głębsze zrozumienie — zamiast mechanicznego wkuwania.' },
        { label: '📇 Fiszki (active recall)', desc: 'Pytanie → próba odpowiedzi → sprawdzenie. Ten prosty cykl zmusza mózg do aktywnego wydobywania wiedzy, co jest jedną z najskuteczniejszych technik utrwalania materiału.' },
        { label: '🎧 Podcasty i słuchanie', desc: 'Uczenie się przez słuchanie aktywuje inny kanał percepcji. Możesz powtarzać materiał w drodze do szkoły, na spacerze — wtedy, kiedy czytanie jest niemożliwe.' },
        { label: '❓ Quizy (self-testing)', desc: 'Testowanie siebie nie służy tylko ocenianiu — to potężna metoda nauki. Quizy pomagają wykryć luki w wiedzy i wzmacniają to, co już wiesz.' },
        { label: '📝 Streszczenia i notatki', desc: 'Przetwarzanie materiału własnymi słowami (lub czytanie dobrych streszczeń) pomaga wyłowić najważniejsze informacje i zorganizować wiedzę w głowie.' },
        { label: '🔁 Powtórki rozłożone w czasie', desc: 'Powtarzanie materiału w rosnących odstępach czasu (np. po 1, 3, 7 dniach) drastycznie zwiększa trwałość wiedzy — to tzw. spaced repetition.' },
      ],
      footer: 'NotebookLM łączy te metody w jednym narzędziu — i robi to automatycznie na podstawie Twoich materiałów. Zobaczmy jak. 👇',
    },
    en: {
      title: '🧠 Proven learning methods',
      intro: <>Before we get to the tools, it{"'"}s worth knowing <strong>why</strong> they work. Every NotebookLM feature is rooted in techniques that researchers have studied for decades — and that really help you remember.</>,
      items: [
        { label: '🗺️ Mind maps', desc: 'Link concepts into a visual network instead of linear notes. They help you see connections between topics and build deeper understanding — instead of mechanical cramming.' },
        { label: '📇 Flashcards (active recall)', desc: 'Question → attempted answer → check. This simple cycle forces the brain to actively retrieve knowledge — one of the most effective techniques for retention.' },
        { label: '🎧 Podcasts and listening', desc: 'Learning by listening activates another perception channel. You can revisit material on your way to school, on a walk — when reading is impossible.' },
        { label: '❓ Quizzes (self-testing)', desc: 'Testing yourself is not only for grading — it\'s a powerful learning method. Quizzes help spot knowledge gaps and reinforce what you already know.' },
        { label: '📝 Summaries and notes', desc: 'Processing material in your own words (or reading good summaries) helps surface the most important information and organize knowledge in your head.' },
        { label: '🔁 Spaced repetition', desc: 'Repeating material at increasing intervals (e.g. after 1, 3, 7 days) dramatically improves retention — known as spaced repetition.' },
      ],
      footer: 'NotebookLM combines these methods in one tool — automatically, based on your materials. Let\'s see how. 👇',
    },
  })

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

      let { data: sessionData } = await supabase
        .from('survey_sessions')
        .select('*')
        .eq('lesson_slug', slug)
        .eq('status', 'active')
        .maybeSingle()

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
          <h1 className="font-heading text-3xl font-bold text-foreground">{t.notFound}</h1>
          <p className="text-muted-foreground">{t.notFoundSub}</p>
        </div>
      </div>
    )
  }

  const titleOverride = slug && LESSON_TITLES[slug] ? LESSON_TITLES[slug][lang] : lesson?.title
  const toolsMap = lang === 'en' ? LESSON_TOOLS_MAP_EN : LESSON_TOOLS_MAP
  const toolsFallback = lang === 'en' ? LESSON_TOOLS_EN : LESSON_TOOLS

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">{t.brand}</p>
            <h1 className="font-heading text-lg font-bold text-foreground">{titleOverride}</h1>
          </div>
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">
        {lesson?.start_survey_enabled && session && (
          slug === '2-notebooklm'
            ? <StartSurveyModule2 lessonSlug={slug} sessionId={session.id} />
            : <StartSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}

        <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.howTitle}</h2>
          <ol className="space-y-2 text-sm text-foreground">
            <li className="flex gap-2"><span className="font-bold text-primary">1.</span> {t.s1}</li>
            <li className="flex gap-2"><span className="font-bold text-primary">2.</span> {t.s2}</li>
            <li className="flex gap-2"><span className="font-bold text-primary">3.</span> {t.s3}</li>
          </ol>
          <div className="bg-muted/50 rounded-lg p-4 space-y-1 text-xs text-muted-foreground">
            <p>{t.w1}</p>
            <p>{t.w2}</p>
            <p>{t.w3}</p>
          </div>
        </section>

        {slug === '1-google-intro' && (
          <section className="bg-card border border-primary/20 rounded-lg p-6 md:p-8 space-y-4">
            <h2 className="font-heading text-xl font-bold text-foreground">{ethics.title}</h2>
            <p className="text-sm text-foreground leading-relaxed">{ethics.p1}</p>
            <p className="text-sm text-foreground leading-relaxed">
              {ethics.p2pre}<strong>{ethics.p2bold}</strong>{ethics.p2post}
            </p>
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-2 text-sm text-foreground">
              <p className="font-semibold">{ethics.reactTitle}</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> {ethics.r1}</li>
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> {ethics.r2}</li>
                <li className="flex gap-2"><span className="text-primary font-bold">→</span> {ethics.r3}</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground italic">{ethics.footer}</p>
          </section>
        )}

        {slug === '1-google-intro' && (
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-xl font-bold text-foreground">{possibilities.title}</h2>
            <p className="text-sm text-foreground leading-relaxed">{possibilities.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">{possibilities.schoolLabel}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {possibilities.schoolItems.map((it, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary">•</span> {it}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground">{possibilities.channelLabel}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {possibilities.channelItems.map((it, i) => (
                    <li key={i} className="flex gap-2"><span className="text-primary">•</span> {it}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">{possibilities.footer}</p>
          </section>
        )}

        {slug === '2-notebooklm' && (
          <section className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
            <h2 className="font-heading text-xl font-bold text-foreground">{methods.title}</h2>
            <p className="text-sm text-foreground leading-relaxed">{methods.intro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {methods.items.map((m, i) => (
                <div key={i} className="bg-muted/40 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">{methods.footer}</p>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">{t.tools}</h2>
          {(slug && toolsMap[slug] ? toolsMap[slug] : toolsFallback).map((tool) => (
            <ToolSection key={tool.name} {...tool} />
          ))}
        </section>

        {lesson?.feedback_survey_enabled && session && (
          slug === '2-notebooklm'
            ? <FeedbackSurveyModule2 lessonSlug={slug} sessionId={session.id} />
            : <FeedbackSurveyModule lessonSlug={slug!} sessionId={session.id} />
        )}
      </main>
    </div>
  )
}
