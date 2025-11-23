"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock } from "lucide-react"

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-2 relative z-20"
    >
      <label className="block text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
        <Clock size={16} />
        Auto-Delete Timer
      </label>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 rounded text-left flex items-center justify-between font-mono transition-all elevation-sm"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          border: isOpen ? "1px solid rgba(210, 180, 222, 0.5)" : "1px solid rgba(210, 180, 222, 0.2)",
        }}
        whileHover={{ boxShadow: "0 8px 24px rgba(210, 180, 222, 0.15)" }}
      >
        <span>{selectedLabel}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          ⌄
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 w-full rounded overflow-hidden z-10 elevation-lg"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid rgba(210, 180, 222, 0.3)",
            }}
          >
            {options.map((option, idx) => (
              <motion.button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full px-6 py-3 text-left font-mono transition-all flex items-center gap-3"
                style={{
                  background: value === option.value ? "rgba(210, 180, 222, 0.15)" : "transparent",
                  color: value === option.value ? "var(--border-glow)" : "var(--text-primary)",
                  borderBottom: idx < options.length - 1 ? "1px solid rgba(210, 180, 222, 0.1)" : "none",
                }}
                whileHover={{ paddingLeft: 24, background: "rgba(210, 180, 222, 0.1)" }}
              >
                <Clock size={14} />
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
