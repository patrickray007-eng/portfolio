import { Download, Briefcase, GraduationCap } from "lucide-react"

const experience = [
  {
    org: "Rice University, Jones Graduate School of Business",
    location: "Houston, TX",
    roles: [
      {
        title: "Clinical Faculty, Entrepreneurship",
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
          "Designed and ran multiple concurrent innovation programs, managing external stakeholders and cross-functional teams.",
          "Built web app automation for grant programs using APIs, webhooks, and database backends, reducing turnaround from application to funding.",
          "Created KPI dashboards and budget forecasts to manage four concurrent programs.",
          "Redesigned core program using Lean Methodology (300% engagement increase). Rebuilt pre-accelerator using Six Sigma (80% more workshops).",
          "Coached 100+ startups/year. Startups secured $1M+ in funding, with several accepted to TechStars and Y Combinator.",
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
  {
    org: "Trace Engines",
    location: "Midland, TX",
    roles: [
      {
        title: "Mechanical Engineer",
        period: "2013 \u2013 2014",
        bullets: [
          "Aviation engine manufacturer. Root cause analysis, failure testing, and design improvements.",
          "Presented recommendations to CEO, saving $500K+/year in warranty claims.",
        ],
      },
    ],
  },
  {
    org: "Manufacturing & Engineering",
    location: "West Texas",
    roles: [
      {
        title: "Mechanical Engineer",
        period: "2006 \u2013 2013",
        bullets: [
          "Several years across small, family-run manufacturing businesses. Hands-on engineering, process improvement, and operations.",
        ],
      },
    ],
  },
]

const education = [
  { school: "Rice University, Jones Graduate School of Business", degree: "MBA, 2020", detail: "Operations, Finance, Entrepreneurship. Global Field Experience in Uganda and Colombia." },
  { school: "University of Texas at Permian Basin", degree: "B.S. Mechanical Engineering, 2012", detail: "Undergraduate research in carbon capture with Los Alamos National Laboratory." },
]

export function ResumeSection() {
  return (
    <section id="resume" className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-pixel-heading)] text-base text-neon text-glow-cyan uppercase tracking-wider">
            Resume
          </h2>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded border border-neon/20 bg-neon/5 px-3 py-1.5 text-xs uppercase tracking-widest text-neon hover:bg-neon/10 hover:border-neon/40 transition-colors"
          >
            <Download className="size-3.5" />
            Download PDF
          </a>
        </div>

        {/* Experience */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="size-4 text-neon/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-neon/50">Experience</span>
          </div>
          <div className="space-y-5 border-l border-neon/10 pl-4">
            {experience.map((exp) => (
              <div key={exp.org}>
                <h3 className="text-base font-semibold text-foreground">{exp.org}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{exp.location}</p>
                {exp.roles.map((role) => (
                  <div key={role.title} className="mt-2">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-medium text-neon/80">{role.title}</span>
                      <span className="text-xs text-muted-foreground">{role.period}</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground list-none">
                      {role.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-neon/30 shrink-0">&gt;</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="size-4 text-neon/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-neon/50">Education</span>
          </div>
          <div className="space-y-3 border-l border-neon/10 pl-4">
            {education.map((ed) => (
              <div key={ed.school}>
                <p className="text-sm font-medium text-foreground">{ed.school}</p>
                <p className="text-xs text-neon/60">{ed.degree}</p>
                {ed.detail && (
                  <p className="text-xs text-muted-foreground mt-0.5">{ed.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
