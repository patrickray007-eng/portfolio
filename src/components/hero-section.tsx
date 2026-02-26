import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section id="top" className="relative flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Patrick Ray
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Entrepreneurship educator, full-stack builder, startup advisor.
          <br className="hidden sm:block" />
          Based in Houston. Teaching at Rice University.
        </p>
        <p className="mt-6 text-sm text-muted-foreground max-w-lg mx-auto">
          This site is powered by an AI that knows my background. Ask it anything,
          paste a job description, or explore the sections below. It will be honest
          about where I'm strong and where I'm not.
        </p>
        <a
          href="#chat"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDown className="size-4 animate-bounce" />
          Ask the AI
        </a>
      </div>
    </section>
  )
}
