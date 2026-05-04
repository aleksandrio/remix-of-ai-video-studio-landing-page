import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import collaborationImage from '@/assets/collaboration.jpeg';
import { useLang } from '@/lib/i18n'

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <div ref={imgRef} className="w-full h-[50vh] lg:h-[60vh] overflow-hidden relative">
      <motion.img src={src} alt={alt} className="absolute inset-0 w-full h-[130%] object-cover" style={{ y }} />
      <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors duration-300" />
    </div>
  )
}

const benefitsPL = [
  { title: 'Odpowiedzialne korzystanie', description: 'Uczniowie uczą się etycznych zasad pracy z AI — wiedzą, co wolno, a czego nie.' },
  { title: 'Lepsze wyniki w nauce', description: 'AI jako tutor pomaga zrozumieć trudne tematy i przygotować się do sprawdzianów.' },
  { title: 'Większa motywacja', description: 'Interaktywne narzędzia AI sprawiają, że nauka staje się angażująca i ciekawa.' },
  { title: 'Kompetencje przyszłości', description: 'Umiejętność pracy z AI to jedna z kluczowych kompetencji XXI wieku.' },
  { title: 'Gotowe narzędzia', description: 'Uczniowie wychodzą z konkretnymi aplikacjami, z których mogą korzystać od razu.' },
  { title: 'Wsparcie dla nauczycieli', description: 'Nauczyciele otrzymują wiedzę, jak integrować AI w codzienną pracę dydaktyczną.' },
]

const benefitsEN = [
  { title: 'Responsible use', description: 'Students learn the ethical rules of working with AI — they know what’s allowed and what isn’t.' },
  { title: 'Better learning results', description: 'AI as a tutor helps to understand difficult topics and prepare for tests.' },
  { title: 'More motivation', description: 'Interactive AI tools make learning engaging and interesting.' },
  { title: 'Skills of the future', description: 'Working with AI is one of the key competencies of the 21st century.' },
  { title: 'Ready-to-use tools', description: 'Students leave with concrete apps they can use right away.' },
  { title: 'Support for teachers', description: 'Teachers get knowledge on how to integrate AI into daily teaching.' },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { lang } = useLang()
  const benefits = lang === 'pl' ? benefitsPL : benefitsEN
  const t = lang === 'pl'
    ? { eyebrow: 'Dlaczego warto', title: 'Korzyści dla szkoły', intro: 'Warsztaty dają uczniom konkretne umiejętności, a nauczycielom spokój — bo wiedzą, że AI jest używane mądrze.', alt: 'Nauczyciel współpracujący z uczniami' }
    : { eyebrow: 'Why it’s worth it', title: 'Benefits for the school', intro: 'The workshops give students concrete skills and teachers peace of mind — knowing AI is used wisely.', alt: 'Teacher collaborating with students' }

  return (
    <section id="korzysci" ref={ref}>
      {/* Full-bleed image with parallax */}
      <ParallaxImage src={collaborationImage} alt={t.alt} />

      <div className="py-20 lg:py-32 px-6 lg:px-10 max-w-6xl mx-auto">
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

        {/* Benefits grid — 2 col editorial */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
              className="bg-background p-8 lg:p-10"
            >
              <span className="text-xs font-semibold tracking-editorial uppercase text-primary mb-5 block">
                0{index + 1}
              </span>
              <h3 className="font-heading text-lg font-semibold mb-3">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
