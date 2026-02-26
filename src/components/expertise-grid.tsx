"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface Skill {
  name: string
  detail: string
}

const strong: Skill[] = [
  { name: "Entrepreneurship Education", detail: "4+ years coaching 100+ startups/year at Rice, teaching MBA and undergrad courses" },
  { name: "Full-Stack Development", detail: "Next.js, React, TypeScript, Python. Built production tools and automations" },
  { name: "Financial Modeling", detail: "DCF valuation, scenario planning, startup financial projections. Teaches this at Rice" },
  { name: "Design Thinking", detail: "Stanford D.School trained. Teaches design thinking to MBA students at Rice" },
  { name: "Program Design", detail: "Redesigned Rice innovation programs, tripled engagement. Six Sigma, Lean methodology" },
  { name: "Startup Advising", detail: "Coached startups to $1M+ in funding, Y Combinator and TechStars acceptances" },
]

const growing: Skill[] = [
  { name: "AI/ML Integration", detail: "Building AI-powered tools daily, but not training models from scratch" },
  { name: "Automated Systems", detail: "Custom workflow automation, API integrations. Growing toward production-scale" },
  { name: "Course Design at Scale", detail: "Strong at individual course design, building toward multi-course program architecture" },
]

const gaps: Skill[] = [
  { name: "Enterprise DevOps", detail: "No experience with CI/CD at enterprise scale, Kubernetes, or cloud infrastructure teams" },
  { name: "Large Team Management", detail: "Led teams of 4-12, not 50+. No experience managing managers" },
  { name: "Production ML", detail: "Uses ML tools, doesn't build ML pipelines or deploy models at scale" },
  { name: "Corporate Enterprise", detail: "Career is startups, academia, and small business. No Fortune 500 experience" },
]

type SkillColor = "cyan" | "amber" | "pink"

function SkillPill({ skill, color }: { skill: Skill; color: SkillColor }) {
  const [expanded, setExpanded] = useState(false)

  const styles = {
    cyan: "border-neon-green/20 hover:border-neon-green/40 text-neon-green/90 hover:text-neon-green bg-neon-green/5 hover:bg-neon-green/10",
    amber: "border-neon-amber/20 hover:border-neon-amber/40 text-neon-amber/90 hover:text-neon-amber bg-neon-amber/5 hover:bg-neon-amber/10",
    pink: "border-muted-foreground/20 hover:border-muted-foreground/30 text-muted-foreground/80 hover:text-muted-foreground bg-muted/30 hover:bg-muted/50",
  }

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "w-full text-left rounded border px-3 py-2 text-[11px] uppercase tracking-wider transition-all",
        styles[color]
      )}
    >
      <span className="flex items-center gap-1.5">
        <ChevronRight className={cn("size-3 shrink-0 transition-transform", expanded && "rotate-90")} />
        {skill.name}
      </span>
      {expanded && (
        <p className="mt-1.5 pl-4.5 text-[10px] normal-case tracking-normal opacity-70 leading-relaxed">
          {skill.detail}
        </p>
      )}
    </button>
  )
}

export function ExpertiseGrid() {
  return (
    <section id="expertise" className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-[family-name:var(--font-pixel-heading)] text-sm text-center text-neon text-glow-cyan uppercase tracking-wider">
          Skills Assessment
        </h2>
        <p className="mt-3 text-center text-xs text-muted-foreground tracking-wide">
          Click any skill for detail. This is how Patrick actually sees his own capabilities.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {/* Strong */}
          <div className="rounded-lg border border-neon-green/15 bg-card/30 p-4 glow-green">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-neon-green opacity-40"></span>
                <span className="relative inline-flex size-2 rounded-full bg-neon-green"></span>
              </span>
              <h3 className="text-[10px] font-bold text-neon-green uppercase tracking-[0.25em]">
                Strong
              </h3>
              <span className="ml-auto text-[10px] text-neon-green/50">{strong.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {strong.map((s) => (
                <SkillPill key={s.name} skill={s} color="cyan" />
              ))}
            </div>
          </div>

          {/* Growing */}
          <div className="rounded-lg border border-neon-amber/15 bg-card/30 p-4 glow-amber">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-neon-amber opacity-40"></span>
                <span className="relative inline-flex size-2 rounded-full bg-neon-amber"></span>
              </span>
              <h3 className="text-[10px] font-bold text-neon-amber uppercase tracking-[0.25em]">
                Growing
              </h3>
              <span className="ml-auto text-[10px] text-neon-amber/50">{growing.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {growing.map((s) => (
                <SkillPill key={s.name} skill={s} color="amber" />
              ))}
            </div>
          </div>

          {/* Gaps */}
          <div className="rounded-lg border border-muted-foreground/10 bg-card/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex size-2">
                <span className="relative inline-flex size-2 rounded-full bg-muted-foreground/50"></span>
              </span>
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em]">
                Gaps
              </h3>
              <span className="ml-auto text-[10px] text-muted-foreground/50">{gaps.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {gaps.map((s) => (
                <SkillPill key={s.name} skill={s} color="pink" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
