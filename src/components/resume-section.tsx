import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const experience = [
  {
    org: "Rice University, Jones Graduate School of Business",
    location: "Houston, TX",
    roles: [
      {
        title: "Clinical Faculty, Entrepreneurship (Part-Time)",
        period: "2025 \u2013 Present",
        bullets: [
          "Teaches MBA students design thinking and undergraduates financial modeling, valuation, and scenario planning.",
          "Develops curriculum focused on building robust financial projections and sustainable business models.",
        ],
      },
      {
        title: "Innovation Program Manager, Liu Idea Lab",
        period: "2022 \u2013 2025",
        bullets: [
          "Coached 100+ startups/year through ideation, financial modeling, fundraising, and scaling.",
          "Redesigned core innovation program using Lean Methodology, leading to 300% engagement increase.",
          "Rebuilt pre-accelerator programs using Root Cause Analysis and Six Sigma, increasing workshops by 80%.",
          "Startups coached secured $1M+ in funding, with several accepted to TechStars and Y Combinator.",
        ],
      },
    ],
  },
  {
    org: "Crescendo Management",
    location: "Houston, TX",
    roles: [
      {
        title: "Cofounder & Managing Partner",
        period: "2020 \u2013 Present",
        bullets: [
          "Innovation, marketing, and strategy consulting for startups and small businesses.",
          "Financial and operational modeling, investment decks, sell-side DCF valuation.",
        ],
      },
    ],
  },
  {
    org: "PBR Music",
    location: "Houston, TX",
    roles: [
      {
        title: "Founder & Bandleader",
        period: "2018 \u2013 Present",
        bullets: [
          "Built and managed all business operations: booking, finances, rights management, payroll, marketing.",
          "Grew revenue tenfold over five years. 85+ shows per year. Three full-length albums.",
        ],
      },
    ],
  },
  {
    org: "Pinnacle Engines",
    location: "San Carlos, CA",
    roles: [
      {
        title: "Mechanical Engineer",
        period: "2014 \u2013 2018",
        bullets: [
          "Venture-funded clean-tech startup. Led multi-organizational test engineering team.",
          "Achieved emissions results 30% better than industry leader. 9+ on-site engagements in India.",
        ],
      },
    ],
  },
]

const education = [
  { school: "Rice University, Jones Graduate School of Business", degree: "MBA, 2020", detail: "Operations, Finance, Entrepreneurship. Global Field Experience in Uganda and Colombia." },
  { school: "Stanford University", degree: "Design Thinking, 2014", detail: "" },
  { school: "University of Texas at Permian Basin", degree: "B.S. Mechanical Engineering, 2012", detail: "Undergraduate research in carbon capture with Los Alamos National Laboratory." },
]

export function ResumeSection() {
  return (
    <section id="resume" className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Resume</h2>
          <Button variant="outline" size="sm" asChild>
            <a href="/resume.pdf" download>
              <Download className="size-4" />
              Download PDF
            </a>
          </Button>
        </div>

        <div className="mt-8 space-y-6">
          {experience.map((exp) => (
            <div key={exp.org}>
              <h3 className="font-semibold">{exp.org}</h3>
              <p className="text-xs text-muted-foreground">{exp.location}</p>
              {exp.roles.map((role) => (
                <div key={role.title} className="mt-2">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium">{role.title}</span>
                    <span className="text-xs text-muted-foreground">{role.period}</span>
                  </div>
                  <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground list-disc pl-4">
                    {role.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <h3 className="font-semibold">Education</h3>
        <div className="mt-3 space-y-3">
          {education.map((ed) => (
            <div key={ed.school}>
              <p className="text-sm font-medium">{ed.school}</p>
              <p className="text-xs text-muted-foreground">{ed.degree}</p>
              {ed.detail && (
                <p className="text-xs text-muted-foreground mt-0.5">{ed.detail}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
