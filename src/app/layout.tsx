import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Patrick Ray | Entrepreneurship Educator, Builder, Advisor",
  description:
    "AI-powered portfolio for Patrick Ray. Ask the AI anything about his background, skills, and fit for your role.",
  openGraph: {
    title: "Patrick Ray | Entrepreneurship Educator, Builder, Advisor",
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
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
