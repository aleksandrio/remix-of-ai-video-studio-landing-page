import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const days = [
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

export function ProgramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="program" className="py-20 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">
            5 spotkań warsztatowych
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Program zajęć
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pięć praktycznych spotkań opartych na modelu Hook → Do → Reflect. Każde spotkanie to 45 minut 
            warsztatów, po których uczniowie dostają materiały z promptami i instrukcjami.
          </p>
        </motion.div>

        {/* Info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-8 mb-16 text-sm text-muted-foreground border-y border-border py-6"
        >
          <span>Uczniowie 13–18 lat</span>
          <span>Grupy do 30 osób</span>
          <span>45 min / spotkanie</span>
          <span>Telefon + internet</span>
        </motion.div>

        {/* Days — editorial list */}
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
                  Dzień {day.day}
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
