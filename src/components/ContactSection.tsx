import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, Send, ArrowRight, CheckCircle } from 'lucide-react'

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    'Napisz do mnie lub zadzwoń',
    'Ustalimy termin i szczegóły',
    'Przeprowadzę warsztaty w Twojej szkole',
  ]

  return (
    <section id="kontakt" className="py-24 lg:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Send className="w-4 h-4" />
            <span className="text-sm font-semibold">Zacznijmy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6">
            Zaproś mnie do Twojej szkoły
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chcesz, żeby uczniowie nauczyli się korzystać z AI mądrze? 
            Skontaktuj się ze mną — ustalimy szczegóły.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold">Jak to wygląda?</h3>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-foreground font-medium text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-accent-emerald/5 rounded-2xl border border-accent-emerald/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent-emerald mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Pierwsza rozmowa jest bezpłatna.</strong>{' '}
                  Opowiem o programie, odpowiem na pytania i dostosujemy warsztaty do potrzeb Twojej szkoły.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-border elevated-shadow"
          >
            <h3 className="text-2xl font-bold mb-6">Skontaktuj się</h3>

            <div className="space-y-5 mb-8">
              <a
                href="mailto:kontakt@aiwszkole.pl"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">kontakt@aiwszkole.pl</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a
                href="tel:+48123456789"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-emerald/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-emerald" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-semibold text-foreground">+48 123 456 789</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-emerald transition-colors" />
              </a>
            </div>

            <a
              href="mailto:kontakt@aiwszkole.pl?subject=Warsztaty AI w szkole"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Napisz do mnie
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
