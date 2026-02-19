import { lazy, Suspense } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { ProgramSection } from './components/ProgramSection'
import { FormatsSection } from './components/FormatsSection'
import { BenefitsSection } from './components/BenefitsSection'
import { AboutSection } from './components/AboutSection'
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })))
import { FooterAI } from './components/FooterAI'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProgramSection />
        <FormatsSection />
        <BenefitsSection />
        <AboutSection />
        <Suspense fallback={null}><ContactSection /></Suspense>
      </main>
      <FooterAI />
    </div>
  )
}
