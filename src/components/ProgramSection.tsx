import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Compass,
  Brain,
  Languages,
  Palette,
  Rocket,
  Clock,
  Users,
  MapPin,
} from 'lucide-react'

const days = [
  {
    day: 1,
    title: 'Wprowadzenie do AI',
    subtitle: 'Czym jest AI i jak z niej korzystać etycznie',
    description:
      'Uczniowie poznają podstawy sztucznej inteligencji, dowiedzą się, jak działają modele językowe i ustalą zasady odpowiedzialnego korzystania z AI w nauce.',
    icon: Compass,
    color: 'bg-primary/10 text-primary',
    borderColor: 'border-primary/20',
  },
  {
    day: 2,
    title: 'AI jako tutor',
    subtitle: 'Personalizowana nauka z gotowymi narzędziami',
    description:
      'Praktyczne ćwiczenia z narzędziami AI do nauki — od tłumaczenia trudnych koncepcji, przez tworzenie notatek, po quizy dopasowane do poziomu ucznia.',
    icon: Brain,
    color: 'bg-accent-emerald/10 text-accent-emerald',
    borderColor: 'border-accent-emerald/20',
  },
  {
    day: 3,
    title: 'Języki i konwersacje',
    subtitle: 'Ćwiczenie języków obcych z AI',
    description:
      'Uczniowie rozmawiają z AI w języku obcym, ćwiczą wymowę, gramatykę i słownictwo. AI dostosowuje poziom trudności do każdego ucznia indywidualnie.',
    icon: Languages,
    color: 'bg-accent-purple/10 text-accent-purple',
    borderColor: 'border-accent-purple/20',
  },
  {
    day: 4,
    title: 'Zapamiętywanie i powtórki',
    subtitle: 'Efektywna nauka z technikami AI',
    description:
      'Fiszki, powtórki rozłożone w czasie i aktywne przypominanie — uczniowie poznają narzędzia AI, które pomagają zapamiętywać materiał na dłużej.',
    icon: Palette,
    color: 'bg-accent-orange/10 text-accent-orange',
    borderColor: 'border-accent-orange/20',
  },
  {
    day: 5,
    title: 'Projekt końcowy',
    subtitle: 'Kreatywne zastosowanie AI w praktyce',
    description:
      'Uczniowie tworzą własny projekt z pomocą AI — prezentację, esej badawczy lub rozwiązanie problemu. Pokazują, że AI wspiera, a nie zastępuje myślenie.',
    icon: Rocket,
    color: 'bg-accent-sky/10 text-accent-sky',
    borderColor: 'border-accent-sky/20',
  },
]

export function ProgramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="program" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">5 dni warsztatów</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Program zajęć
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pięć intensywnych dni, podczas których uczniowie poznają praktyczne zastosowania AI 
            w nauce — korzystając z gotowych, sprawdzonych narzędzi.
          </p>
        </motion.div>

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 subtle-shadow">
            <MapPin className="w-4 h-4 text-accent-emerald" />
            <span className="text-sm font-medium">Stacjonarnie w Twojej szkole</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 subtle-shadow">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Dla grup do 30 uczniów</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 subtle-shadow">
            <Clock className="w-4 h-4 text-accent-purple" />
            <span className="text-sm font-medium">45 min / zajęcia</span>
          </div>
        </motion.div>

        {/* Days timeline */}
        <div className="space-y-6">
          {days.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`bg-card rounded-2xl p-6 sm:p-8 border ${day.borderColor} elevated-shadow hover:shadow-lg transition-shadow`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                {/* Day number + icon */}
                <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:min-w-[80px]">
                  <div className={`w-14 h-14 rounded-xl ${day.color} flex items-center justify-center`}>
                    <day.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Dzień {day.day}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1">{day.title}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{day.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{day.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
