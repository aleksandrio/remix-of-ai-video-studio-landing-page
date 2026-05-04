import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import workshopImage from '@/assets/workshop-detail.webp'
import { useLang } from '@/lib/i18n'

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
  const { lang } = useLang()

  const t = lang === 'pl' ? {
    eyebrow: 'Problem',
    title1: 'Uczniowie używają AI.',
    title2: 'Pytanie — jak?',
    intro: 'Sztuczna inteligencja jest już w każdej klasie. Problem nie w tym, że uczniowie z niej korzystają — ale w tym, jak to robią.',
    badLabel: 'AI jako ściąga',
    bad: [
      'Kopiowanie gotowych odpowiedzi z ChatGPT',
      'Generowanie wypracowań bez zrozumienia',
      'Oszukiwanie na testach i sprawdzianach',
    ],
    badEffectStrong: 'Efekt:',
    badEffect: 'Uczniowie nie uczą się myśleć. Tracą motywację i umiejętność rozwiązywania problemów.',
    goodLabel: 'AI jako mentor',
    good: [
      'AI wyjaśnia trudne tematy krok po kroku',
      'Personalizowane ćwiczenia i powtórki',
      'Konwersacje językowe z natywnym AI',
    ],
    goodEffectStrong: 'Efekt:',
    goodEffect: 'Uczniowie rozumieją materiał głębiej, uczą się szybciej i rozwijają krytyczne myślenie.',
    alt: 'Uczeń pracujący z narzędziami AI',
  } : {
    eyebrow: 'Problem',
    title1: 'Students already use AI.',
    title2: 'The question is — how?',
    intro: 'AI is already in every classroom. The problem is not that students use it — it’s how they use it.',
    badLabel: 'AI as a cheat sheet',
    bad: [
      'Copy-pasting ready answers from ChatGPT',
      'Generating essays without understanding',
      'Cheating on tests and exams',
    ],
    badEffectStrong: 'Result:',
    badEffect: 'Students don’t learn to think. They lose motivation and problem-solving skills.',
    goodLabel: 'AI as a mentor',
    good: [
      'AI explains difficult topics step by step',
      'Personalized exercises and revisions',
      'Language conversations with a native-like AI',
    ],
    goodEffectStrong: 'Result:',
    goodEffect: 'Students understand the material more deeply, learn faster and develop critical thinking.',
    alt: 'Student working with AI tools',
  }

  return (
    <section id="problem" ref={ref}>
      <div className="py-20 lg:py-32 px-6 lg:px-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">{t.eyebrow}</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
            {t.title1}
            <br />
            <span className="text-muted-foreground">{t.title2}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{t.intro}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-border mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-background p-8 lg:p-12"
          >
            <p className="text-xs font-semibold tracking-editorial uppercase text-accent-terracotta mb-8">{t.badLabel}</p>
            <ul className="space-y-5">
              {t.bad.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-terracotta mt-2.5 shrink-0" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <strong className="text-foreground">{t.badEffectStrong}</strong> {t.badEffect}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-background p-8 lg:p-12"
          >
            <p className="text-xs font-semibold tracking-editorial uppercase text-primary mb-8">{t.goodLabel}</p>
            <ul className="space-y-5">
              {t.good.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
              <strong className="text-foreground">{t.goodEffectStrong}</strong> {t.goodEffect}
            </p>
          </motion.div>
        </div>
      </div>

      <ParallaxImage src={workshopImage} alt={t.alt} />
    </section>
  )
}
