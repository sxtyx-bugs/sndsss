"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface RecentShare {
  id: string
  message_id: string
  created_at: string
  expires_at?: string
}

export function RecentShares() {
  const [recentShares, setRecentShares] = useState<RecentShare[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("[v0] Supabase credentials not found")
      setIsLoading(false)
      return
    }

    const supabase = createBrowserClient(supabaseUrl, supabaseKey)

    const fetchRecentShares = async () => {
      const { data, error } = await supabase
        .from("recent_shares")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)

      if (error) {
        console.error("[v0] Error fetching recent shares:", error)
        setRecentShares([])
      } else {
        setRecentShares(data || [])
      }
      setIsLoading(false)
    }

    fetchRecentShares()

    const cleanupInterval = setInterval(() => {
      fetchRecentShares()
    }, 30000)

    const channel = supabase
      .channel("recent-shares-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "recent_shares",
        },
        (payload) => {
          // Add new share to the top of the list
          setRecentShares((prev) => [payload.new as RecentShare, ...prev].slice(0, 20))
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "recent_shares",
        },
        (payload) => {
          // Remove deleted share from the list
          setRecentShares((prev) => prev.filter((share) => share.id !== payload.old.id))
        },
      )
      .subscribe()

    return () => {
      clearInterval(cleanupInterval)
      supabase.removeChannel(channel)
    }
  }, [])

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const created = new Date(dateString)
    const diffMs = now.getTime() - created.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "just now"
    if (diffMins === 1) return "1 min ago"
    if (diffMins < 60) return `${diffMins} mins ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return "1 hour ago"
    if (diffHours < 24) return `${diffHours} hours ago`

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return "1 day ago"
    return `${diffDays} days ago`
  }

  const handleOpen = (messageId: string) => {
    router.push(`/m/${messageId}`)
  }

  if (isLoading || recentShares.length === 0) {
    return null
  }

  return (
    <div className="glass-dark dark:bg-white/90 dark:border-gray-300 rounded-2xl p-6 backdrop-blur-xl bg-black/80 border border-green-500/20 shadow-2xl transition-colors duration-300">
      <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-4">Recent Shares</h3>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {recentShares.map((share) => (
          <div
            key={share.id}
            className="flex items-center justify-between p-3 rounded-lg bg-black/50 dark:bg-white/50 border border-green-500/10 dark:border-gray-200 hover:border-green-500/30 dark:hover:border-green-300 transition-all"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Clock className="h-4 w-4 text-green-400 dark:text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-gray-400 dark:text-gray-600 truncate">
                  {share.message_id.slice(0, 8)}...
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{getTimeAgo(share.created_at)}</p>
              </div>
            </div>
            <Button
              onClick={() => handleOpen(share.message_id)}
              size="sm"
              className="bg-green-600 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700 text-white text-xs h-8 flex-shrink-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
