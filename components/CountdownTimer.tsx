"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  expiresAt: string
  onExpired?: () => void
}

export default function CountdownTimer({ expiresAt, onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const updateTimer = () => {
      const expiryDate = new Date(expiresAt).getTime()
      const now = new Date().getTime()
      const difference = expiryDate - now

      if (difference <= 0) {
        setTimeLeft("Expired")
        onExpired?.()
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      let timeString = ""
      if (days > 0) timeString += `${days}d `
      if (hours > 0) timeString += `${hours}h `
      if (minutes > 0) timeString += `${minutes}m `
      timeString += `${seconds}s`

      setTimeLeft(timeString.trim())
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [expiresAt, onExpired])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4" />
      <span>{timeLeft || "Loading..."}</span>
    </div>
  )
}
