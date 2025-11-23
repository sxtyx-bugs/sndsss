"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface CopyBoxProps {
  link: string
  onNew: () => void
}

export default function CopyBox({ link, onNew }: CopyBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Secret Link Generated
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>Share this link. It will self-destruct after one view.</p>
      </motion.div>

      <motion.div
        className="glass p-6 flex items-center gap-3 cursor-pointer"
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          value={link}
          readOnly
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "var(--accent-neon)" }}
        />
        <motion.button
          className="px-4 py-2 rounded-lg font-semibold text-white transition-all"
          style={{ background: copied ? "var(--success-green)" : "var(--border-glow)" }}
          onClick={(e) => {
            e.stopPropagation()
            handleCopy()
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </motion.button>
      </motion.div>

      <motion.button
        onClick={onNew}
        className="w-full py-3 px-6 rounded-lg font-semibold text-white"
        style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Create Another Message
      </motion.button>
    </motion.div>
  )
}
