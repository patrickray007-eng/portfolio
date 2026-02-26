"use client"

import { MessageSquare, Search, User, Wrench, Users } from "lucide-react"

const prompts = [
  {
    text: "Paste a job description to assess fit",
    icon: Search,
  },
  {
    text: "What are Patrick's honest gaps?",
    icon: User,
  },
  {
    text: "Summarize Patrick for someone who hasn't met him",
    icon: MessageSquare,
  },
  {
    text: "What has Patrick built or created?",
    icon: Wrench,
  },
  {
    text: "What would Patrick bring to a team like mine?",
    icon: Users,
  },
]

interface SamplePromptsProps {
  onSelect: (prompt: string) => void
}

export function SamplePrompts({ onSelect }: SamplePromptsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt.text}
          onClick={() => onSelect(prompt.text)}
          className="inline-flex items-center gap-2 rounded border border-neon/20 bg-neon/5 px-3 py-2 text-[11px] text-neon/80 hover:text-neon hover:border-neon/40 hover:bg-neon/10 transition-all"
        >
          <prompt.icon className="size-3 shrink-0" />
          {prompt.text}
        </button>
      ))}
    </div>
  )
}
