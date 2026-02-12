import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { ProgramSection } from './components/ProgramSection'
import { FormatsSection } from './components/FormatsSection'
import { BenefitsSection } from './components/BenefitsSection'
import { CalendlySection } from './components/CalendlySection'
import { ContactSection } from './components/ContactSection'
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
        <CalendlySection />
        <ContactSection />
      </main>
      <FooterAI />
    </div>
  )
}
