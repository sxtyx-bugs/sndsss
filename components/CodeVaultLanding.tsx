"use client"

import { useState } from "react"
import { ChevronRight, Lock, Zap, Shield } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"

const navItems = [
  { label: "Getting Started", href: "#" },
  { label: "Core Concepts", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Security", href: "#" },
  { label: "Examples", href: "#" },
  { label: "Best Practices", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Support", href: "#" },
]

const features = [
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Your messages are encrypted client-side before leaving your device.",
  },
  {
    icon: Zap,
    title: "Auto-Destructing",
    description: "Messages self-destruct after viewing or expiration time.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "No tracking, no logs, no analytics. Your privacy is paramount.",
  },
]

interface CodeVaultLandingProps {
  onEnter: () => void
}

export default function CodeVaultLanding({ onEnter }: CodeVaultLandingProps) {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onEnter}
              className="text-2xl font-bold tracking-wider hover:text-cyan-400 transition-colors duration-300 text-white"
            >
              SNDSS
            </button>
            <span className="text-slate-500 text-sm ml-2">Secure Message Sharing</span>
          </div>
          <button
            onClick={onEnter}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-cyan-400 text-sm font-medium transition-all duration-300"
          >
            Access
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950/30 backdrop-blur-sm min-h-[calc(100vh-73px)] overflow-y-auto sticky top-[73px]">
          <nav className="p-4 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Documentation
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  hoveredNav === item.label ? "text-cyan-400 bg-slate-800/50" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-73px)] overflow-y-auto">
          {/* Hero Section */}
          <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/50 to-transparent">
            <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
              <ScrollReveal
                size="xl"
                align="left"
                enableBlur={true}
                baseOpacity={0.2}
                staggerDelay={0.08}
                containerClassName="mb-8"
                textClassName="text-white font-bold tracking-tight"
              >
                Learn Web Development the Right Way
              </ScrollReveal>

              <ScrollReveal
                size="md"
                align="left"
                enableBlur={true}
                baseOpacity={0.3}
                staggerDelay={0.05}
                containerClassName="mb-10"
                textClassName="text-slate-300 font-normal"
              >
                Master modern web technologies with interactive tutorials, real-world examples, and hands-on practice.
                Start your coding journey today.
              </ScrollReveal>

              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Enter Application
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Content Section */}
          <section className="max-w-4xl mx-auto px-6 py-16">
            <div className="space-y-12">
              {/* Features */}
              <div>
                <ScrollReveal size="lg" align="left" containerClassName="mb-8" textClassName="text-white font-bold">
                  Why SNDSS?
                </ScrollReveal>
                <div className="grid md:grid-cols-3 gap-6">
                  {features.map((feature, i) => {
                    const Icon = feature.icon
                    return (
                      <div
                        key={i}
                        className="p-6 rounded-lg border border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/50 transition-all duration-300"
                      >
                        <Icon className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-slate-400">{feature.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <ScrollReveal size="lg" align="left" containerClassName="mb-6" textClassName="text-white font-bold">
                  How It Works
                </ScrollReveal>
                <ol className="space-y-4">
                  {[
                    "Write your message",
                    "Choose an expiration time",
                    "Share the link",
                    "Message auto-destructs after viewing or expiration",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-lg border border-slate-800 bg-slate-950/50">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold">
                        {i + 1}
                      </span>
                      <span className="text-slate-300 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Security Info */}
              <div className="p-6 rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900/50 to-slate-950/50">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  Security
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• AES-256-GCM encryption on every message</li>
                  <li>• PBKDF2 key derivation with 100,000 iterations</li>
                  <li>• Automatic deletion after first read</li>
                  <li>• Configurable expiration times (30 sec - 1 hour)</li>
                  <li>• No server-side logs or analytics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="border-t border-slate-800 bg-gradient-to-t from-slate-900/30 to-transparent">
            <div className="max-w-4xl mx-auto px-6 py-12 text-center">
              <p className="text-slate-400 mb-6">Ready to share securely?</p>
              <button
                onClick={onEnter}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              >
                Open SNDSS
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
