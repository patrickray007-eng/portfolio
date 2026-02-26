import { HeroSection } from "@/components/hero-section"
import { ChatInterface } from "@/components/chat-interface"
import { ExpertiseGrid } from "@/components/expertise-grid"
import { ResumeSection } from "@/components/resume-section"
import { ContactForm } from "@/components/contact-form"
import { SiteHeader } from "@/components/site-header"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <Separator />
        <ChatInterface />
        <Separator />
        <ExpertiseGrid />
        <Separator />
        <ResumeSection />
        <Separator />
        <ContactForm />
        <footer className="border-t py-6 text-center text-xs text-muted-foreground">
          Built by Patrick Ray. Powered by Claude.
        </footer>
      </main>
    </>
  )
}
