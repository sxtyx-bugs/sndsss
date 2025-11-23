"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Plus } from "lucide-react"

interface CopyBoxProps {
  link: string
  onNew: () => void
}

export default function CopyBox({ link, onNew }: CopyBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8 max-w-2xl"
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-4xl font-bold font-mono mb-3" style={{ color: "var(--accent-neon)" }}>
          Secret Link Generated
        </h2>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Share this link. It will self-destruct after one view.
        </p>
      </motion.div>

      <motion.div
        className="glass p-8 rounded cursor-pointer elevation-md"
        onClick={handleCopy}
        whileHover={{ boxShadow: "0 0 30px rgba(210, 180, 222, 0.3)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={link}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm font-mono break-all"
            style={{ color: "var(--border-glow)" }}
          />
          <motion.button
            className="px-4 py-2 rounded font-semibold text-white flex items-center gap-2 whitespace-nowrap"
            style={{
              background: copied ? "var(--success-green)" : "var(--border-glow)",
              color: "var(--bg-primary)",
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleCopy()
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <motion.button
        onClick={onNew}
        className="w-full py-4 px-6 rounded font-semibold text-white flex items-center justify-center gap-2 elevation-md"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-primary)",
          border: "1px solid rgba(210, 180, 222, 0.2)",
        }}
        whileHover={{ scale: 1.02, borderColor: "rgba(210, 180, 222, 0.4)" }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={18} />
        Create Another Message
      </motion.button>
    </motion.div>
  )
}
