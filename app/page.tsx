"use client"

import { useState } from "react"
import CodeVaultLanding from "@/components/CodeVaultLanding"
import ShareApp from "@/components/ShareApp"

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (!showApp) {
    return <CodeVaultLanding onEnter={() => setShowApp(true)} />
  }

  return <ShareApp />
}
