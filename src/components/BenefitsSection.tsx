import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ShieldCheck,
  TrendingUp,
  Smile,
  GraduationCap,
  Wrench,
  HeartHandshake,
} from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Odpowiedzialne korzystanie',
    description: 'Uczniowie uczą się etycznych zasad pracy z AI — wiedzą, co wolno, a czego nie.',
  },
  {
    icon: TrendingUp,
    title: 'Lepsze wyniki w nauce',
    description: 'AI jako tutor pomaga zrozumieć trudne tematy i przygotować się do sprawdzianów.',
  },
  {
    icon: Smile,
    title: 'Większa motywacja',
    description: 'Interaktywne narzędzia AI sprawiają, że nauka staje się angażująca i ciekawa.',
  },
  {
    icon: GraduationCap,
    title: 'Kompetencje przyszłości',
    description: 'Umiejętność pracy z AI to jedna z kluczowych kompetencji XXI wieku.',
  },
  {
    icon: Wrench,
    title: 'Gotowe narzędzia',
    description: 'Uczniowie wychodzą z konkretnymi aplikacjami, z których mogą korzystać od razu.',
  },
  {
    icon: HeartHandshake,
    title: 'Wsparcie dla nauczycieli',
    description: 'Nauczyciele otrzymują wiedzę, jak integrować AI w codzienną pracę dydaktyczną.',
  },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="korzysci" className="py-24 lg:py-32 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent-emerald/10 text-accent-emerald px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Dlaczego warto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Korzyści dla szkoły
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Warsztaty dają uczniom konkretne umiejętności, a nauczycielom spokój — 
            bo wiedzą, że AI jest używane mądrze.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="bg-card rounded-2xl p-7 border border-border elevated-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
