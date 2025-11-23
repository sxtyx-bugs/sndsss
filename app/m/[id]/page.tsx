"use client"

import { useParams } from "next/navigation"
import ShareView from "@/components/ShareView"

export default function ViewMessage() {
  const { id } = useParams() as { id: string }

  return <ShareView shareId={id} onNavigateHome={() => (window.location.href = "/")} />
}
