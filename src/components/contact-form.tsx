"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

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

    // Honeypot check client-side
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
        throw new Error(body.error || "Something went wrong. Try emailing directly.")
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
          <CheckCircle className="mx-auto size-8 text-emerald-600" />
          <h2 className="mt-3 text-xl font-bold">Message sent</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Patrick will get back to you soon.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="px-6 py-16">
      <div className="mx-auto max-w-lg">
        <h2 className="text-2xl font-bold text-center">Get in Touch</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Interested in working together? Drop a note.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="What's on your mind?"
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="source" className="text-sm font-medium">
              How did you find me? <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Input
              id="source"
              name="source"
              placeholder="LinkedIn, referral, search..."
              className="mt-1"
            />
          </div>

          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="size-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? (
              "Sending..."
            ) : (
              <>
                <Send className="size-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
