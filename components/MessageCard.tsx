"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface MessageCardProps {
  message: string
  onRead: () => void
}

export default function MessageCard({ message, onRead }: MessageCardProps) {
  const [showRead, setShowRead] = useState(true)

  const handleOk = () => {
    onRead()
    setShowRead(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="w-full max-w-2xl"
    >
      <motion.div className="glass p-8 space-y-6">
        <motion.div
          className="p-6 rounded-lg"
          style={{ background: "var(--bg-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p style={{ color: "var(--text-primary)" }} className="text-lg leading-relaxed break-words">
            {message}
          </p>
        </motion.div>

        <motion.p
          className="text-center text-sm neon-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          This message will now self-destruct.
        </motion.p>

        <motion.button
          onClick={handleOk}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white"
          style={{ background: "var(--error-red)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          I Have Read It - Delete
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
