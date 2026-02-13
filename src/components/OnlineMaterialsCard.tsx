import { motion } from 'framer-motion'
import { useState } from 'react'
import { Play, CheckCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function OnlineMaterialsCard({ isInView }: { isInView: boolean }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedEmail = email.trim()
    const trimmedName = name.trim()

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Podaj poprawny adres email')
      setFormState('error')
      return
    }
    if (trimmedName.length > 100 || trimmedEmail.length > 255) {
      setErrorMsg('Dane są zbyt długie')
      setFormState('error')
      return
    }

    setFormState('loading')
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: trimmedEmail, name: trimmedName || null })

    if (error) {
      setErrorMsg('Coś poszło nie tak. Spróbuj ponownie.')
      setFormState('error')
    } else {
      setFormState('success')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.39 }}
      className="border border-primary/30 bg-primary/5 rounded-lg p-8 lg:p-10 md:col-span-2 flex flex-col"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Play className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
          Wkrótce
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="font-heading text-2xl font-semibold mb-4">
            Nagrania i materiały online
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Kompletny zestaw nagrań wideo, ćwiczeń i promptów — dostępny w formie subskrypcji. 
            Idealne dla szkół, które chcą wdrożyć program we własnym tempie, bez konieczności 
            organizowania spotkań na żywo.
          </p>
          <ul className="space-y-3">
            {[
              'Nagrane lekcje wideo z ćwiczeniami',
              'Gotowe prompty i materiały do pobrania',
              'Dostęp w ramach subskrypcji',
            ].map((detail) => (
              <li key={detail} className="flex items-center gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          {formState === 'success' ? (
            <div className="flex flex-col items-center text-center py-4 gap-3">
              <CheckCircle className="w-10 h-10 text-primary" />
              <p className="font-heading text-lg font-semibold">Dziękuję!</p>
              <p className="text-sm text-muted-foreground">
                Dam Ci znać, gdy materiały będą gotowe.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold mb-1">Zostaw swój email</p>
              <p className="text-xs text-muted-foreground mb-5">
                Powiadomię Cię, gdy materiały będą dostępne.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Imię (opcjonalnie)"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setFormState('idle') }}
                  maxLength={100}
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
                />
                <input
                  type="email"
                  placeholder="Twój adres email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFormState('idle') }}
                  maxLength={255}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground/50"
                />
                {formState === 'error' && (
                  <p className="text-xs text-destructive">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {formState === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Zapisz się na listę'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}
