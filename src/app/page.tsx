import { HeroSection } from "@/components/hero-section"
import { ChatInterface } from "@/components/chat-interface"
import { ExpertiseGrid } from "@/components/expertise-grid"
import { ResumeSection } from "@/components/resume-section"
import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"

function SectionDivider() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
    </div>
  )
}

function TickerFooter() {
  const items = [
    "RICE UNIVERSITY",
    "JONES GRADUATE SCHOOL",
    "DESIGN THINKING",
    "FINANCIAL MODELING",
    "FULL-STACK DEV",
    "STARTUP ADVISING",
    "HOUSTON TX",
    "STANFORD D.SCHOOL",
    "AI-POWERED TOOLS",
    "WEST TEXAS ROOTS",
  ]

  const tickerContent = items.map((item) => `${item}  //  `).join("")

  return (
    <footer className="border-t border-neon/10 overflow-hidden bg-card/30">
      <div className="py-2.5">
        <div className="animate-ticker whitespace-nowrap">
          <span className="text-xs uppercase tracking-[0.3em] text-neon/30">
            {tickerContent}
            {tickerContent}
          </span>
        </div>
      </div>
      <div className="border-t border-neon/5 py-3 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50">
          Built by Patrick Ray // Powered by Claude // {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <SectionDivider />
        <ChatInterface />
        <SectionDivider />
        <ExpertiseGrid />
        <SectionDivider />
        <ResumeSection />
        <SectionDivider />
        <ContactForm />
      </main>
      <TickerFooter />
    </>
  )
}
