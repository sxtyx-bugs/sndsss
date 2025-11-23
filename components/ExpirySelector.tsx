"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface ExpirySelectorProps {
  value: number
  onChange: (value: number) => void
}

export default function ExpirySelector({ value, onChange }: ExpirySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { label: "5 minutes", value: 5 },
    { label: "30 minutes", value: 30 },
    { label: "1 hour", value: 60 },
    { label: "6 hours", value: 360 },
    { label: "24 hours", value: 1440 },
  ]

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "24 hours"

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
        Message Expiry
      </label>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-2xl text-left flex items-center justify-between transition-all"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          border: `1px solid rgba(16, 185, 129, 0.2)`,
        }}
        whileHover={{ borderColor: "rgba(16, 185, 129, 0.4)" }}
      >
        <span>{selectedLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ▼
        </motion.div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full mt-2 w-full rounded-2xl overflow-hidden z-10"
        style={{
          background: "var(--bg-secondary)",
          border: `1px solid rgba(16, 185, 129, 0.2)`,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => {
              onChange(option.value)
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 text-left hover:bg-opacity-50 transition-all"
            style={{
              background: value === option.value ? "rgba(16, 185, 129, 0.1)" : "transparent",
              color: value === option.value ? "var(--border-glow)" : "var(--text-primary)",
            }}
            whileHover={{ paddingLeft: 20 }}
          >
            {option.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
