import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { XCircle, CheckCircle, AlertTriangle, Brain, MessageSquare, Lightbulb } from 'lucide-react'

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const badExamples = [
    { icon: XCircle, text: 'Kopiowanie gotowych odpowiedzi z ChatGPT' },
    { icon: XCircle, text: 'Generowanie wypracowań bez zrozumienia' },
    { icon: XCircle, text: 'Oszukiwanie na testach i sprawdzianach' },
  ]

  const goodExamples = [
    { icon: CheckCircle, text: 'AI wyjaśnia trudne tematy krok po kroku' },
    { icon: CheckCircle, text: 'Personalizowane ćwiczenia i powtórki' },
    { icon: CheckCircle, text: 'Konwersacje językowe z natywnym AI' },
  ]

  return (
    <section id="problem" className="py-24 lg:py-32 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 text-accent-orange px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold">Czy wiesz, że...</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Uczniowie używają AI.
            <br />
            <span className="text-muted-foreground">Pytanie — jak?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sztuczna inteligencja jest już w każdej klasie. Problem nie w tym, że uczniowie
            z niej korzystają — ale w tym, jak to robią.
          </p>
        </motion.div>

        {/* Two columns comparison */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Bad way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border border-destructive/20 elevated-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI jako ściąga</h3>
                <p className="text-sm text-muted-foreground">Tak dziś wygląda rzeczywistość</p>
              </div>
            </div>

            <div className="space-y-4">
              {badExamples.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5">
                  <item.icon className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Efekt?</strong> Uczniowie nie uczą się myśleć.
                Tracą motywację i umiejętność rozwiązywania problemów.
              </p>
            </div>
          </motion.div>

          {/* Good way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-accent-emerald/20 elevated-shadow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-emerald" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI jako mentor</h3>
                <p className="text-sm text-muted-foreground">Tak może wyglądać przyszłość</p>
              </div>
            </div>

            <div className="space-y-4">
              {goodExamples.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent-emerald/5">
                  <item.icon className="w-5 h-5 text-accent-emerald mt-0.5 shrink-0" />
                  <span className="text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent-emerald/5 rounded-xl border border-accent-emerald/10">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Efekt?</strong> Uczniowie rozumieją materiał głębiej,
                uczą się szybciej i rozwijają krytyczne myślenie.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-card rounded-2xl p-6 border border-border elevated-shadow">
            <div className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-primary" />
              <span className="font-medium">Krytyczne myślenie</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MessageSquare className="w-5 h-5 text-accent-emerald" />
              <span className="font-medium">Umiejętności komunikacji</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Lightbulb className="w-5 h-5 text-accent-orange" />
              <span className="font-medium">Kreatywne rozwiązywanie</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
