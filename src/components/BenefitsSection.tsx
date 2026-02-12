import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import collaborationImage from '@/assets/collaboration.png'

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  return (
    <div ref={imgRef} className="w-full h-[50vh] lg:h-[60vh] overflow-hidden relative">
      <motion.img src={src} alt={alt} className="absolute inset-0 w-full h-[130%] object-cover" style={{ y }} />
    </div>
  )
}

const benefits = [
  {
    title: 'Odpowiedzialne korzystanie',
    description: 'Uczniowie uczą się etycznych zasad pracy z AI — wiedzą, co wolno, a czego nie.',
  },
  {
    title: 'Lepsze wyniki w nauce',
    description: 'AI jako tutor pomaga zrozumieć trudne tematy i przygotować się do sprawdzianów.',
  },
  {
    title: 'Większa motywacja',
    description: 'Interaktywne narzędzia AI sprawiają, że nauka staje się angażująca i ciekawa.',
  },
  {
    title: 'Kompetencje przyszłości',
    description: 'Umiejętność pracy z AI to jedna z kluczowych kompetencji XXI wieku.',
  },
  {
    title: 'Gotowe narzędzia',
    description: 'Uczniowie wychodzą z konkretnymi aplikacjami, z których mogą korzystać od razu.',
  },
  {
    title: 'Wsparcie dla nauczycieli',
    description: 'Nauczyciele otrzymują wiedzę, jak integrować AI w codzienną pracę dydaktyczną.',
  },
]

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="korzysci" ref={ref}>
      {/* Full-bleed image with parallax */}
      <ParallaxImage src={collaborationImage} alt="Nauczyciel współpracujący z uczniami" />

      {/* Benefits content */}
      <div className="py-20 lg:py-32 px-6 lg:px-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-xs font-medium tracking-editorial uppercase text-muted-foreground mb-8">
            Dlaczego warto
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Korzyści dla szkoły
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Warsztaty dają uczniom konkretne umiejętności, a nauczycielom spokój — 
            bo wiedzą, że AI jest używane mądrze.
          </p>
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
