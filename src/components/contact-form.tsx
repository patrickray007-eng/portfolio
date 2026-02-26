"use client"

import { useState, type FormEvent } from "react"
import { Send, CheckCircle, AlertCircle, Radio } from "lucide-react"

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    if (data.get("website")) {
      setStatus("success")
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          source: data.get("source"),
          website: data.get("website"),
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Transmission failed. Try again.")
      }

      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="px-6 py-16">
        <div className="mx-auto max-w-lg text-center">
          <CheckCircle className="mx-auto size-6 text-neon-green" />
          <h2 className="mt-3 font-[family-name:var(--font-pixel-heading)] text-xs text-neon-green uppercase tracking-wider">
            Message Sent
          </h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Patrick will get back to you soon.
          </p>
        </div>
      </section>
    )
  }

  const inputClasses =
    "w-full rounded border border-neon/15 bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 transition-colors"

  return (
    <section id="contact" className="px-6 py-16">
      <div className="mx-auto max-w-lg">
        <h2 className="font-[family-name:var(--font-pixel-heading)] text-sm text-center text-neon text-glow-cyan uppercase tracking-wider">
          Contact
        </h2>
        <p className="mt-3 text-center text-xs text-muted-foreground tracking-wide">
          Interested in working together? Send a transmission.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-lg border border-neon/15 bg-card/30 p-5 space-y-4 glow-cyan"
        >
          <div className="flex items-center gap-2 mb-2">
            <Radio className="size-3 text-neon" />
            <span className="text-[10px] uppercase tracking-widest text-neon">
              New Transmission
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className={`mt-1 ${inputClasses}`}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className={`mt-1 ${inputClasses}`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="What's on your mind?"
              className={`mt-1 min-h-[80px] resize-none ${inputClasses}`}
            />
          </div>

          <div>
            <label htmlFor="source" className="text-[10px] uppercase tracking-widest text-muted-foreground">
              How did you find me? <span className="text-muted-foreground/50">(optional)</span>
            </label>
            <input
              id="source"
              name="source"
              placeholder="LinkedIn, referral, search..."
              className={`mt-1 ${inputClasses}`}
            />
          </div>

          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-neon-pink">
              <AlertCircle className="size-3.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 rounded border border-neon/30 bg-neon/10 py-2.5 text-[11px] uppercase tracking-widest text-neon hover:bg-neon/20 hover:border-neon/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            {status === "loading" ? (
              "Transmitting..."
            ) : (
              <>
                <Send className="size-3.5" />
                Send Transmission
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
