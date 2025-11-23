"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, Flame } from "lucide-react"

interface MessageCardProps {
  message: string
  onRead: () => void
  expiresAt?: string
}

export default function MessageCard({ message, onRead, expiresAt }: MessageCardProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    if (!expiresAt || isRevealed) return

    const updateTimer = () => {
      const now = new Date()
      const expires = new Date(expiresAt)
      const diff = expires.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s left`)
      } else {
        setTimeLeft(`${seconds}s left`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [expiresAt, isRevealed])

  const handleReveal = () => {
    setIsRevealed(true)
  }

  const handleRead = async () => {
    await onRead()
  }

  if (!isRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="w-full max-w-2xl space-y-6"
      >
        {/* Locked State Container */}
        <motion.div
          className="glass p-12 rounded space-y-8 elevation-lg"
          style={{ background: "rgba(31, 38, 64, 0.5)" }}
        >
          {/* Lock Icon */}
          <motion.div
            className="flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="relative">
              <Lock size={64} style={{ color: "var(--border-glow)" }} className="drop-shadow-lg" />
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(210, 180, 222, 0.3)",
                    "0 0 20px rgba(210, 180, 222, 0.6)",
                    "0 0 0px rgba(210, 180, 222, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>

          {/* Message Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl font-bold font-mono" style={{ color: "var(--text-primary)" }}>
              Locked Message
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              This message is encrypted and will self-destruct.
            </p>
          </motion.div>

          {/* Timer Display */}
          {timeLeft && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded"
              style={{ background: "rgba(210, 180, 222, 0.1)", border: "1px solid rgba(210, 180, 222, 0.2)" }}
            >
              <Flame size={18} style={{ color: "var(--error-red)" }} />
              <span className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
                {timeLeft}
              </span>
            </motion.div>
          )}

          {/* Reveal Button */}
          <motion.button
            onClick={handleReveal}
            className="w-full py-4 px-6 rounded font-semibold text-white flex items-center justify-center gap-3 elevation-md"
            style={{
              background: "var(--border-glow)",
              color: "var(--bg-primary)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(210, 180, 222, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Eye size={20} />
            View Secret
          </motion.button>
        </motion.div>

        {/* Warning Text */}
        <motion.p
          className="text-center text-xs font-mono"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Once viewed, this message will be permanently deleted
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
      className="w-full max-w-2xl space-y-6"
    >
      {/* Revealed Message */}
      <motion.div
        className="glass p-10 rounded space-y-6 elevation-lg"
        style={{ background: "rgba(31, 38, 64, 0.5)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Message Content */}
        <motion.div
          className="p-6 rounded font-mono text-sm md:text-base break-words leading-relaxed overflow-auto max-h-96"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid rgba(210, 180, 222, 0.2)",
            color: "var(--border-glow)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.div>

        {/* Destruction Warning */}
        <motion.div
          className="flex items-center justify-center gap-3 px-4 py-3 rounded"
          style={{ background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.3)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Flame size={18} style={{ color: "var(--error-red)" }} animate={{ scale: [1, 1.2, 1] }} />
          <span className="font-mono text-sm" style={{ color: "var(--error-red)" }}>
            Message will self-destruct after viewing
          </span>
        </motion.div>

        {/* Delete Button */}
        <motion.button
          onClick={handleRead}
          className="w-full py-4 px-6 rounded font-semibold text-white"
          style={{
            background: "var(--error-red)",
            color: "white",
          }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          I Have Read It - Delete
        </motion.button>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        className="text-center text-xs font-mono"
        style={{ color: "var(--text-secondary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Message permanently deleted after confirmation
      </motion.p>
    </motion.div>
  )
}
