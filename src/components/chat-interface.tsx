"use client"

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import { SamplePrompts } from "@/components/sample-prompts"
import { Send, Bot, Loader2, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  async function sendMessage(text: string) {
    if (!text.trim() || isStreaming) return

    const userMessage: Message = { role: "user", content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsStreaming(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Failed to get response")
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error("No response stream")

      const decoder = new TextDecoder()
      let assistantContent = ""

      setMessages([...newMessages, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") break
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                setMessages([
                  ...newMessages,
                  { role: "assistant", content: assistantContent },
                ])
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Something went wrong."
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Error: ${errorText}`,
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <section id="chat" className="px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-[family-name:var(--font-pixel-heading)] text-sm text-center text-neon text-glow-cyan uppercase tracking-wider">
          Ask the AI
        </h2>
        <p className="mt-3 text-center text-xs text-muted-foreground tracking-wide">
          This AI knows Patrick's background and will give you an honest assessment.
          Paste a job description, ask about gaps, or explore freely.
        </p>

        <div className="mt-6 rounded-lg border border-neon/20 bg-card/50 backdrop-blur-sm glow-cyan overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-neon/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <Bot className="size-3.5 text-neon" />
              <span className="text-[10px] uppercase tracking-widest text-neon">
                AI Interface
              </span>
            </div>
            {isStreaming && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-neon"></span>
                </span>
                <span className="text-[10px] text-neon tracking-widest">STREAMING</span>
              </div>
            )}
          </div>

          {/* Messages */}
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="py-6">
                <p className="text-center text-[11px] text-muted-foreground mb-4 uppercase tracking-wider">
                  Select a prompt to begin:
                </p>
                <SamplePrompts onSelect={sendMessage} />
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded border border-neon/30 bg-neon/10">
                    <Bot className="size-3 text-neon" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed",
                    msg.role === "user"
                      ? "bg-neon/10 border border-neon/20 text-foreground"
                      : "bg-secondary/50 border border-border text-foreground/90"
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === "assistant" &&
                    msg.content === "" &&
                    isStreaming && (
                      <Loader2 className="size-3 animate-spin text-neon" />
                    )}
                </div>
                {msg.role === "user" && (
                  <div className="flex size-6 shrink-0 items-center justify-center rounded border border-neon-amber/30 bg-neon-amber/10">
                    <User className="size-3 text-neon-amber" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-neon/10 p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="> Enter query..."
                rows={1}
                disabled={isStreaming}
                className="flex-1 min-h-[36px] max-h-[120px] resize-none rounded border border-neon/15 bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                className="flex size-9 items-center justify-center rounded border border-neon/20 bg-neon/10 text-neon hover:bg-neon/20 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              >
                {isStreaming ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Send className="size-3.5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
