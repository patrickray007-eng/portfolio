import { NextRequest } from "next/server"
import { Resend } from "resend"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed } = checkRateLimit(`contact:${ip}`, {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 3 per hour
  })

  if (!allowed) {
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    )
  }

  let body: {
    name?: string
    email?: string
    message?: string
    source?: string
    website?: string
  }

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { name, email, message, source, website } = body

  // Honeypot: reject if filled
  if (website) {
    return Response.json({ success: true })
  }

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    )
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 })
  }

  // Length limits
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return Response.json({ error: "Input too long." }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL || "patrickray700@gmail.com"

  try {
    await getResend().emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        source ? `Source: ${source}` : null,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Contact email error:", error)
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
