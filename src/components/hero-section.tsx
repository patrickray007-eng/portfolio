import { ArrowDown, Terminal } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center pixel-grid scanlines"
    >
      <div className="relative mx-auto max-w-2xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-3 py-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-neon-green"></span>
          </span>
          <span className="text-xs uppercase tracking-widest text-neon-green">
            Available for opportunities
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-pixel-heading)] text-2xl sm:text-3xl text-neon text-glow-cyan uppercase tracking-wider leading-relaxed">
          Patrick Ray
        </h1>

        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Entrepreneurship Educator // Full-Stack Builder // Startup Advisor
        </p>

        <p className="mt-2 text-sm text-muted-foreground tracking-wide">
          Houston, TX // Rice University // Jones Graduate School of Business
        </p>

        <div className="mt-8 mx-auto max-w-md rounded-lg border border-neon/10 bg-card/50 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="size-3.5 text-neon" />
            <span className="text-xs uppercase tracking-widest text-neon">System Message</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This site is powered by an AI that knows my background. Ask it anything,
            paste a job description, or explore the sections below. It will be honest
            about where I'm strong and where I'm not.
          </p>
        </div>

        <a
          href="#chat"
          className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-neon/70 hover:text-neon transition-colors"
        >
          <ArrowDown className="size-4 animate-bounce" />
          Initialize chat
        </a>
      </div>
    </section>
  )
}
