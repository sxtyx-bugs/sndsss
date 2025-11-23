"use client"

import { useParams } from "next/navigation"
import ShareView from "@/components/ShareView"

export default function ViewMessage() {
  const { id } = useParams() as { id: string }

  console.log("[v0] ViewMessage page loaded with id:", id)
  console.log("[v0] Full params:", useParams())

  return <ShareView shareId={id} onNavigateHome={() => (window.location.href = "/")} />
  // </CHANGE>
}
