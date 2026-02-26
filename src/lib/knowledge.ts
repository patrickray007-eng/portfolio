import { readFileSync } from "fs"
import { join } from "path"

let cached: string | null = null

export function getKnowledge(): string {
  if (cached) return cached
  const filePath = join(process.cwd(), "knowledge", "patrick.md")
  cached = readFileSync(filePath, "utf-8")
  return cached
}
