"use client"

import { motion } from "framer-motion"

interface TextBoxProps {
  value: string
  onChange: (value: string) => void
}

export default function TextBox({ value, onChange }: TextBoxProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your secret message here..."
        className="w-full h-64 p-4 rounded-lg text-white resize-none focus:outline-none focus:ring-2"
        style={{
          background: "var(--bg-secondary)",
          borderColor: "var(--border-glow)",
          color: "var(--text-primary)",
        }}
      />
    </motion.div>
  )
}
