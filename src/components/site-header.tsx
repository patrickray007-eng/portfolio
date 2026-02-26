"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#chat", label: "ASK AI" },
  { href: "#expertise", label: "SKILLS" },
  { href: "#resume", label: "RESUME" },
  { href: "#contact", label: "CONTACT" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    function tick() {
      const now = new Date()
      setTime(
        now.toISOString().slice(0, 19).replace("T", " ") + "Z"
      )
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        scrolled
          ? "bg-[#080c16]/95 backdrop-blur-md border-neon/20 glow-cyan"
          : "bg-[#080c16]/80 border-neon/10"
      )}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="font-[family-name:var(--font-pixel-heading)] text-[10px] text-neon text-glow-cyan tracking-wider hover:text-white transition-colors"
          >
            PATRICK RAY
          </a>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            {time}
          </span>
        </div>
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-neon hover:bg-neon/5 rounded transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
