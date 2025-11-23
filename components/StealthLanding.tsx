"use client"

import { motion } from "framer-motion"
import { Lock, Eye, Clock, ChevronRight } from "lucide-react"

interface StealthLandingProps {
  onEnter: () => void
}

export default function StealthLanding({ onEnter }: StealthLandingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Minimal Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 py-8 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(210, 180, 222, 0.1)" }}
      >
        <motion.div
          className="text-xl font-bold font-mono"
          style={{ color: "var(--accent-neon)" }}
          animate={{
            textShadow: [
              "0 0 10px rgba(210, 180, 222, 0.5)",
              "0 0 20px rgba(210, 180, 222, 0.8)",
              "0 0 10px rgba(210, 180, 222, 0.5)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          EPHEMERAL
        </motion.div>
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(210, 180, 222, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded font-semibold text-white flex items-center gap-2 elevation-sm"
          style={{
            background: "var(--border-glow)",
            color: "var(--bg-primary)",
          }}
        >
          Enter
          <ChevronRight size={16} />
        </motion.button>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="flex-1 flex items-center justify-center px-6 md:px-12 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl w-full space-y-12">
          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-mono tracking-tight leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Share Secrets
              <br />
              <span className="neon-text">That Disappear</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl" style={{ color: "var(--text-secondary)" }}>
              End-to-end encrypted ephemeral message sharing. One view, then gone.
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onEnter}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(210, 180, 222, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded font-semibold text-white flex items-center gap-3 elevation-md"
              style={{
                background: "var(--border-glow)",
                color: "var(--bg-primary)",
              }}
            >
              Start Securely Sharing
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronRight size={20} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16"
            style={{ borderTop: "1px solid rgba(210, 180, 222, 0.1)" }}
          >
            {[
              { icon: Lock, title: "AES-256 Encrypted", desc: "Military-grade encryption" },
              { icon: Eye, title: "View Once", desc: "Auto-deletes after reading" },
              { icon: Clock, title: "Time-Based Expiry", desc: "Messages self-destruct" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="space-y-3 p-4 rounded"
                style={{ background: "rgba(31, 38, 64, 0.3)" }}
              >
                <feature.icon size={24} style={{ color: "var(--border-glow)" }} />
                <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="px-6 md:px-12 py-8 text-center border-t"
        style={{ borderColor: "rgba(210, 180, 222, 0.1)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          © 2025 EphemeralShare. End-to-end encrypted message sharing.
        </p>
      </motion.footer>
    </div>
  )
}
