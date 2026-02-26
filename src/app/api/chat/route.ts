import { NextRequest } from "next/server"
import { streamChat } from "@/lib/claude"
import { buildSystemPrompt } from "@/lib/prompts"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const { allowed, resetAt } = checkRateLimit(`chat:${ip}`, {
    maxRequests: 10,
    windowMs: 60 * 1000, // 10 per minute
  })

  if (!allowed) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)) },
      }
    )
  }

  let body: { messages?: Array<{ role: string; content: string }> }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { messages } = body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages are required" }, { status: 400 })
  }

  // Validate message format
  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== "string") {
      return Response.json({ error: "Invalid message format" }, { status: 400 })
    }
    if (msg.role !== "user" && msg.role !== "assistant") {
      return Response.json({ error: "Invalid message role" }, { status: 400 })
    }
  }

  // Cap conversation length to prevent abuse
  const trimmedMessages = messages.slice(-20)

  try {
    const systemPrompt = buildSystemPrompt()
    const stream = await streamChat(
      systemPrompt,
      trimmedMessages as Array<{ role: "user" | "assistant"; content: string }>
    )

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    )
  }
}
