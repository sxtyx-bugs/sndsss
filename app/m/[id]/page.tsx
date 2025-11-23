"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import MessageCard from "@/components/MessageCard"
import { decryptMessage } from "@/utils/crypto"
import { getMessage, deleteMessage } from "@/utils/database"

export default function ViewMessage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [messageData, setMessageData] = useState<any>(null)
  const [decryptedMessage, setDecryptedMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await getMessage(id as string)

        if (!data) {
          setIsDeleted(true)
          return
        }

        if (data.read) {
          setIsDeleted(true)
          return
        }

        const now = new Date()
        const expiresAt = new Date(data.expires_at)

        if (now > expiresAt) {
          setIsExpired(true)
          // Auto-delete expired message
          await deleteMessage(data.id)
          return
        }

        setMessageData(data)
        const decrypted = await decryptMessage(data.encrypted_data, data.password)
        setDecryptedMessage(decrypted)
      } catch (error) {
        console.error("Error fetching message:", error)
        setIsDeleted(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessage()
  }, [id])

  const handleRead = async () => {
    try {
      if (messageData?.id) {
        await deleteMessage(messageData.id)
      }
      setIsDeleted(true)
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-12 h-12 border-2 rounded-full"
          style={{ borderColor: "var(--border-glow)", borderTopColor: "transparent" }}
        />
      </div>
    )
  }

  if (isDeleted || isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold" style={{ color: "var(--error-red)" }}>
            {isExpired ? "Message Expired" : "Message Deleted"}
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {isExpired
              ? "This message has expired and has been automatically deleted."
              : "This message has already been viewed or deleted."}
          </p>
          <motion.button
            onClick={() => router.push("/")}
            className="px-6 py-3 rounded-2xl font-semibold text-white"
            style={{ background: "var(--border-glow)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create New Message
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg-primary)" }}>
      <MessageCard message={decryptedMessage} onRead={handleRead} />
    </div>
  )
}
