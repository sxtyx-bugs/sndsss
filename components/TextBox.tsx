"use client"

import { motion } from "framer-motion"

interface TextBoxProps {
  value: string
  onChange: (value: string) => void
}

export default function TextBox({ value, onChange }: TextBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-2"
    >
      <label className="block text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
        Secret Message
      </label>
      <motion.div
        className="relative rounded elevation-sm"
        whileHover={{ boxShadow: "0 12px 32px rgba(210, 180, 222, 0.15)" }}
        transition={{ duration: 0.3 }}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your secret message here... (encrypted before transmission)"
          className="w-full h-72 p-6 rounded font-mono resize-none focus:outline-none transition-all"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "rgba(210, 180, 222, 0.2)",
            color: "var(--text-primary)",
            border: "1px solid rgba(210, 180, 222, 0.2)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(210, 180, 222, 0.5)"
            e.currentTarget.style.boxShadow = "inset 0 0 10px rgba(210, 180, 222, 0.05)"
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(210, 180, 222, 0.2)"
            e.currentTarget.style.boxShadow = "none"
          }}
        />
      </motion.div>
    </motion.div>
  )
}
