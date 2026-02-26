import type { Metadata } from "next"
import { Press_Start_2P, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const pixelFont = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel-heading",
  subsets: ["latin"],
})

const monoFont = JetBrains_Mono({
  variable: "--font-mono-body",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PATRICK RAY // BUILDER, EDUCATOR, ADVISOR",
  description:
    "AI-powered portfolio for Patrick Ray. Ask the AI anything about his background, skills, and fit for your role.",
  openGraph: {
    title: "PATRICK RAY // BUILDER, EDUCATOR, ADVISOR",
    description:
      "AI-powered portfolio. Ask the AI anything about Patrick's background and fit for your role.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${pixelFont.variable} ${monoFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
