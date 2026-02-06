import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ProblemSection } from './components/ProblemSection'
import { ProgramSection } from './components/ProgramSection'
import { BenefitsSection } from './components/BenefitsSection'
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
        <BenefitsSection />
        <ContactSection />
      </main>
      <FooterAI />
    </div>
  )
}
