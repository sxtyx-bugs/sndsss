"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import StealthLanding from "@/components/StealthLanding"
import TextBox from "@/components/TextBox"
import CopyBox from "@/components/CopyBox"
import ExpirySelector from "@/components/ExpirySelector"
import { encryptMessage, generateMessageId } from "@/utils/crypto"
import { storeMessage } from "@/utils/database"

export default function Home() {
  const [showApp, setShowApp] = useState(false)
  const [message, setMessage] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [expiryDuration, setExpiryDuration] = useState(1440) // 24 hours default

  const handleGenerateLink = async () => {
    if (!message.trim()) return

    setIsLoading(true)
    setError("")
    try {
      const messageId = generateMessageId()
      const { encrypted, password } = await encryptMessage(message)
      const expiresAt = new Date(Date.now() + expiryDuration * 60 * 1000)

      await storeMessage(messageId, encrypted, password, expiresAt, expiryDuration)

      const link = `${window.location.origin}/m/${messageId}`
      setGeneratedLink(link)
      setMessage("")
    } catch (error) {
      console.error("Error generating link:", error)
      setError("Failed to generate link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!showApp) {
    return <StealthLanding onEnter={() => setShowApp(true)} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {!generatedLink ? (
          <div className="space-y-8">
            <div className="text-center space-y-2 mb-8">
              <motion.h1
                className="text-5xl md:text-6xl font-bold"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                EphemeralShare
              </motion.h1>
              <motion.p
                className="text-lg"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Share secrets that self-destruct
              </motion.p>
            </div>

            <motion.div
              className="glass p-8 space-y-6 rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TextBox value={message} onChange={setMessage} />

              <ExpirySelector value={expiryDuration} onChange={setExpiryDuration} />

              {error && (
                <motion.p
                  className="text-sm"
                  style={{ color: "var(--error-red)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                onClick={handleGenerateLink}
                disabled={isLoading || !message.trim()}
                className="w-full mt-6 py-3 px-6 rounded-2xl font-semibold text-white transition-all"
                style={{
                  background: "var(--border-glow)",
                  opacity: isLoading || !message.trim() ? 0.5 : 1,
                  cursor: isLoading || !message.trim() ? "not-allowed" : "pointer",
                }}
                whileHover={
                  !isLoading && message.trim() ? { scale: 1.02, boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)" } : {}
                }
                whileTap={!isLoading && message.trim() ? { scale: 0.98 } : {}}
              >
                {isLoading ? "Generating..." : "Generate Secret Link"}
              </motion.button>

              <motion.p
                className="text-center text-sm"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Your message will auto-delete after 1 view or expire based on selected time
              </motion.p>
            </motion.div>
          </div>
        ) : (
          <CopyBox link={generatedLink} onNew={() => setGeneratedLink("")} />
        )}
      </motion.div>
    </motion.div>
  )
}
