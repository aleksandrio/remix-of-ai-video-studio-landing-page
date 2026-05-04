import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '@/lib/i18n'

const daysPL = [
  {
    day: 1,
    title: 'Efektywna nauka z AI',
    subtitle: 'Twój osobisty system powtórek',
    description:
      'Uczniowie tworzą mapy myśli, fiszki i podcasty z własnych materiałów za pomocą AI. Poznają techniki Active Recall i Spaced Repetition — i dostają instrukcje, by powtórzyć to w domu.',
  },
  {
    day: 2,
    title: 'AI w naukach ścisłych',
    subtitle: 'Jak sprawić, żeby AI Cię nauczyło, a nie zrobiło za Ciebie',
    description:
      'Uczniowie piszą prompty sokratejskie, dzięki którym AI zadaje pytania naprowadzające zamiast podawać gotowe odpowiedzi. Ćwiczą rozwiązywanie zadań z matmy, fizyki i chemii metodą dialogu.',
  },
  {
    day: 3,
    title: 'AI w pisaniu i humanistyce',
    subtitle: 'Jak pisać z pomocą AI, a nie za pomocą AI',
    description:
      'Burza mózgów, struktura argumentów i analiza perspektyw — z AI. Ale sam tekst uczniowie piszą własnymi słowami. Uczą się, gdzie kończy się narzędzie, a zaczyna plagiat.',
  },
  {
    day: 4,
    title: 'AI w językach obcych',
    subtitle: 'Rozmowa bez stresu — AI jako partner do ćwiczeń',
    description:
      'Uczniowie prowadzą konwersacje z AI w języku obcym — tekstowo i głosowo. AI poprawia błędy gramatyczne, dostosowuje poziom i nigdy nie ocenia. Idealne do codziennych 5-minutowych ćwiczeń.',
  },
  {
    day: 5,
    title: 'Krytyczne myślenie',
    subtitle: 'AI się myli — i to jest OK, jeśli to zauważysz',
    description:
      'Uczniowie szukają halucynacji AI, weryfikują błędne informacje i uczą się, dlaczego AI „zmyśla". Budują najważniejszą kompetencję: umiejętność krytycznej oceny tego, co czytają.',
  },
]

const daysEN = [
  {
    day: 1,
    title: 'Effective learning with AI',
    subtitle: 'Your personal revision system',
    description:
      'Students create mind maps, flashcards and podcasts from their own materials with AI. They learn Active Recall and Spaced Repetition — and get instructions to repeat it at home.',
  },
  {
    day: 2,
    title: 'AI in STEM',
    subtitle: 'How to make AI teach you instead of doing it for you',
    description:
      'Students write Socratic prompts that make AI ask guiding questions instead of giving ready answers. They practice solving math, physics and chemistry tasks through dialogue.',
  },
  {
    day: 3,
    title: 'AI in writing and humanities',
    subtitle: 'How to write with AI, not by AI',
    description:
      'Brainstorming, argument structure and perspective analysis — with AI. But students write the text in their own words. They learn where the tool ends and plagiarism begins.',
  },
  {
    day: 4,
    title: 'AI for foreign languages',
    subtitle: 'Stress-free conversation — AI as a practice partner',
    description:
      'Students talk with AI in a foreign language — by text and voice. AI corrects grammar, adapts the level and never judges. Perfect for daily 5-minute practice.',
  },
  {
    day: 5,
    title: 'Critical thinking',
    subtitle: 'AI makes mistakes — and that’s OK if you notice',
    description:
      'Students hunt AI hallucinations, verify wrong information and learn why AI "makes things up". They build the most important skill: critically evaluating what they read.',
  },
]

export function ProgramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang } = useLang()
  const days = lang === 'pl' ? daysPL : daysEN

  const t = lang === 'pl' ? {
    eyebrow: '5 spotkań warsztatowych',
    title: 'Program zajęć',
    intro: 'Pięć praktycznych spotkań opartych na modelu Hook → Do → Reflect. Każde spotkanie to 45 minut warsztatów, po których uczniowie dostają materiały z promptami i instrukcjami.',
    info: ['Uczniowie 13–18 lat', 'Grupy do 30 osób', '45 min / spotkanie', 'Telefon + internet'],
    dayLabel: 'Dzień',
  } : {
    eyebrow: '5 workshop sessions',
    title: 'Course program',
    intro: 'Five practical sessions based on the Hook → Do → Reflect model. Each session is a 45-minute workshop after which students receive materials with prompts and instructions.',
    info: ['Students 13–18 years', 'Groups up to 30', '45 min / session', 'Phone + internet'],
    dayLabel: 'Day',
  }

  return (
    <section id="program" className="py-20 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">{t.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">{t.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-8 mb-16 text-sm text-muted-foreground border-y border-border py-6"
        >
          {t.info.map((s) => <span key={s}>{s}</span>)}
        </motion.div>

        <div className="divide-y divide-border">
          {days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-10 group"
            >
              <div>
                <span className="text-xs font-semibold tracking-editorial uppercase text-muted-foreground">
                  {t.dayLabel} {day.day}
                </span>
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                  {day.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-4">{day.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{day.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
