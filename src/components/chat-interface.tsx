"use client"

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SamplePrompts } from "@/components/sample-prompts"
import { Send, User, Bot, Loader2 } from "lucide-react"
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
          content: `Sorry, I ran into an issue: ${errorText}`,
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
        <h2 className="text-2xl font-bold text-center">Ask the AI</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          This AI knows Patrick's background and will give you an honest assessment.
          Paste a job description, ask about gaps, or explore freely.
        </p>

        <div className="mt-6 rounded-xl border bg-card shadow-sm">
          {/* Messages */}
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="py-6">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Try one of these to get started:
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
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="size-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  {msg.role === "assistant" &&
                    msg.content === "" &&
                    isStreaming && (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    )}
                </div>
                {msg.role === "user" && (
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Patrick's background..."
                rows={1}
                className="min-h-[40px] max-h-[120px] resize-none"
                disabled={isStreaming}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isStreaming}
              >
                {isStreaming ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
