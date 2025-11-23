"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, FileText, AlertCircle, Home } from "lucide-react"
import CountdownTimer from "./CountdownTimer"
import { useToast } from "@/hooks/use-toast"
import LaserFlow from "@/components/LaserFlow"

interface ShareData {
  id: string
  content: string
  expiresAt: string
  createdAt: string
}

interface ShareViewProps {
  shareId: string
  onNavigateHome?: () => void
}

export default function ShareView({ shareId, onNavigateHome }: ShareViewProps) {
  const [shareData, setShareData] = useState<ShareData | null>(null)
  const [loading, setLoading] = useState(true)
  const [expired, setExpired] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchShare = async () => {
      setLoading(true)

      try {
        const { getShare } = await import("@/lib/api")
        const data = await getShare(shareId)
        setShareData({
          id: data.id,
          content: data.content,
          expiresAt: data.expiresAt,
          createdAt: data.createdAt,
        })
      } catch (error: any) {
        if (error.message && (error.message.includes("404") || error.message.includes("expired"))) {
          setNotFound(true)
        } else {
          setNotFound(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchShare()
  }, [shareId])

  const handleCopy = async () => {
    if (!shareData) return

    try {
      await navigator.clipboard.writeText(shareData.content)
      toast({
        title: "Copied!",
        description: "Content copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please select and copy manually.",
        variant: "destructive",
      })
    }
  }

  const handleExpired = () => {
    setExpired(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <LaserFlow laserColor="rgba(34, 197, 94, 0.6)" lineWidth={2} speed={1} density={20} />
        <div className="text-center relative z-10">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading shared content...</p>
        </div>
      </div>
    )
  }

  if (notFound || expired || !shareData) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        <LaserFlow laserColor="rgba(34, 197, 94, 0.6)" lineWidth={2} speed={1} density={20} />
        <Card
          className="max-w-md w-full relative z-10 bg-black/80 backdrop-blur-xl border-green-500/30"
          data-testid="card-not-found"
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-green-400" />
            </div>
            <CardTitle className="text-white">Content Not Available</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-400">
              {notFound
                ? "This content does not exist or has already been deleted."
                : "This content has expired and been automatically removed for security."}
            </p>
            <Button
              onClick={onNavigateHome}
              className="bg-green-600 hover:bg-green-500 text-white"
              data-testid="button-home"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden p-4">
      <LaserFlow laserColor="rgba(34, 197, 94, 0.6)" lineWidth={2} speed={1} density={20} />
      <div className="max-w-4xl mx-auto relative z-10 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2" data-testid="title-share">
              Shared Content
            </h1>
            <p className="text-sm text-gray-400">
              Share ID: <span className="text-green-400 font-mono">{shareData.id}</span>
            </p>
          </div>

          <div className="text-right">
            <CountdownTimer expiresAt={shareData.expiresAt} onExpired={handleExpired} />
            <p className="text-xs text-gray-500 mt-1">Created {new Date(shareData.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <Card
          className="bg-black/90 backdrop-blur-xl border-2 border-green-500/40 shadow-2xl shadow-green-500/10"
          data-testid="card-content"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-green-500/20">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-400" />
              <CardTitle className="text-lg text-white font-semibold">Content</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400 border border-green-500/40 font-medium"
                data-testid="badge-readonly"
              >
                Read Only
              </Badge>
              <Button
                onClick={handleCopy}
                size="sm"
                className="bg-green-600 hover:bg-green-500 text-white border border-green-500/40 shadow-lg hover:shadow-green-500/20 transition-all"
                data-testid="button-copy-content"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-black/70 p-6 rounded-lg border border-green-500/30 shadow-inner">
              <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap text-gray-200 leading-relaxed">
                <code data-testid="content-display">{shareData.content}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-4">
          <Button
            onClick={onNavigateHome}
            className="bg-gray-900 hover:bg-gray-800 text-white border border-green-500/30 shadow-lg hover:shadow-green-500/20 transition-all"
            data-testid="button-back-home"
          >
            <Home className="h-4 w-4 mr-2" />
            Create Your Own Share
          </Button>

          <p className="text-xs text-gray-500">This content will be automatically deleted when the timer expires.</p>
        </div>
      </div>
    </div>
  )
}
