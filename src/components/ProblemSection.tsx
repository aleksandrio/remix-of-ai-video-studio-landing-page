import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import workshopImage from '@/assets/workshop-detail.webp'

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <div ref={imgRef} className="w-full h-[50vh] lg:h-[70vh] overflow-hidden relative">
      <motion.img src={src} alt={alt} className="absolute inset-0 w-full h-[130%] object-cover" style={{ y }} />
      <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors duration-300" />
    </div>
  )
}

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="problem" ref={ref}>
      {/* Text content */}
      <div className="py-20 lg:py-32 px-6 lg:px-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">
            Problem
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
            Uczniowie używają AI.
            <br />
            <span className="text-muted-foreground">Pytanie — jak?</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Sztuczna inteligencja jest już w każdej klasie. Problem nie w tym, że uczniowie
            z niej korzystają — ale w tym, jak to robią.
          </p>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-background p-8 lg:p-12"
          >
            <p className="text-xs font-semibold tracking-editorial uppercase text-accent-terracotta mb-8">
              AI jako ściąga
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">Kopiowanie gotowych odpowiedzi z ChatGPT</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">Generowanie wypracowań bez zrozumienia</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">Oszukiwanie na testach i sprawdzianach</span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <strong className="text-foreground">Efekt:</strong> Uczniowie nie uczą się myśleć.
              Tracą motywację i umiejętność rozwiązywania problemów.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-background p-8 lg:p-12"
          >
            <p className="text-xs font-semibold tracking-editorial uppercase text-primary mb-8">
              AI jako mentor
            </p>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">AI wyjaśnia trudne tematy krok po kroku</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">Personalizowane ćwiczenia i powtórki</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                <span className="text-foreground leading-relaxed">Konwersacje językowe z natywnym AI</span>
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <strong className="text-foreground">Efekt:</strong> Uczniowie rozumieją materiał głębiej,
              uczą się szybciej i rozwijają krytyczne myślenie.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed image divider with parallax */}
      <ParallaxImage src={workshopImage} alt="Uczeń pracujący z narzędziami AI" />
    </section>
  )
}
