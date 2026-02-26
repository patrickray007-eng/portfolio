"use client"

import { Button } from "@/components/ui/button"
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
        <Button
          key={prompt.text}
          variant="outline"
          size="sm"
          className="h-auto py-2 px-3 text-xs text-left whitespace-normal"
          onClick={() => onSelect(prompt.text)}
        >
          <prompt.icon className="size-3.5 shrink-0" />
          {prompt.text}
        </Button>
      ))}
    </div>
  )
}
