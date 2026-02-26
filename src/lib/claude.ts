import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic()

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function streamChat(
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<ReadableStream> {
  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  })

  const encoder = new TextEncoder()

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ text: event.delta.text })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })
}
