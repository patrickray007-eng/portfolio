"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

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
  { name: "Corporate Enterprise Experience", detail: "Career is startups, academia, and small business. No Fortune 500 experience" },
]

function SkillPill({ skill, color }: { skill: Skill; color: "green" | "amber" | "neutral" }) {
  const [expanded, setExpanded] = useState(false)

  const colorClasses = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    amber: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100",
    neutral: "bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100",
  }

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className={cn(
        "w-full text-left rounded-lg border px-3 py-2 text-sm transition-colors",
        colorClasses[color]
      )}
    >
      <span className="font-medium">{skill.name}</span>
      {expanded && (
        <p className="mt-1 text-xs opacity-80">{skill.detail}</p>
      )}
    </button>
  )
}

export function ExpertiseGrid() {
  return (
    <section id="expertise" className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-center">Honest Skills Assessment</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Click any skill for detail. This is how Patrick actually sees his own capabilities.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-emerald-700 uppercase tracking-wide">
              Strong
            </h3>
            <div className="flex flex-col gap-2">
              {strong.map((s) => (
                <SkillPill key={s.name} skill={s} color="green" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-amber-700 uppercase tracking-wide">
              Growing
            </h3>
            <div className="flex flex-col gap-2">
              {growing.map((s) => (
                <SkillPill key={s.name} skill={s} color="amber" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-500 uppercase tracking-wide">
              Gaps
            </h3>
            <div className="flex flex-col gap-2">
              {gaps.map((s) => (
                <SkillPill key={s.name} skill={s} color="neutral" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
