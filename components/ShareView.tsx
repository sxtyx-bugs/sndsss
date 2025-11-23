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
        <LaserFlow laserColor="rgba(34, 197, 94, 0.3)" lineWidth={1} speed={0.8} density={15} />
        <div className="text-center relative z-10">
          <div className="animate-spin h-8 w-8 border-2 border-green-500/40 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (notFound || expired || !shareData) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        <LaserFlow laserColor="rgba(34, 197, 94, 0.3)" lineWidth={1} speed={0.8} density={15} />
        <Card
          className="max-w-md w-full relative z-10 bg-white border border-gray-200 shadow-lg"
          data-testid="card-not-found"
        >
          <CardHeader className="text-center border-b border-gray-100 pb-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <AlertCircle className="h-5 w-5 text-gray-600" />
            </div>
            <CardTitle className="text-gray-900 text-lg font-semibold">Content Not Available</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 pt-6">
            <p className="text-sm text-gray-600">
              {notFound
                ? "This content does not exist or has already been deleted."
                : "This content has expired and been removed."}
            </p>
            <Button
              onClick={onNavigateHome}
              className="bg-black hover:bg-gray-800 text-white text-sm"
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <LaserFlow laserColor="rgba(34, 197, 94, 0.3)" lineWidth={1} speed={0.8} density={15} />

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="max-w-3xl w-full space-y-4">
          {/* Header section */}
          <div className="flex items-center justify-between px-2">
            <div>
              <h1 className="text-xl font-semibold text-white mb-1" data-testid="title-share">
                Shared Content
              </h1>
              <p className="text-xs text-gray-400">
                Share ID: <span className="text-green-400 font-mono text-xs">{shareData.id}</span>
              </p>
            </div>

            <div className="text-right">
              <CountdownTimer expiresAt={shareData.expiresAt} onExpired={handleExpired} />
              <p className="text-xs text-gray-500 mt-1">Created {new Date(shareData.createdAt).toLocaleString()}</p>
            </div>
          </div>

          {/* Main content card - clean white design */}
          <Card className="bg-white border border-gray-200 shadow-xl" data-testid="card-content">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-700" />
                <CardTitle className="text-base text-gray-900 font-semibold">Content</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-700 border-0 text-xs font-medium"
                  data-testid="badge-readonly"
                >
                  Read Only
                </Badge>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white text-xs h-8"
                  data-testid="button-copy-content"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap text-gray-800 leading-relaxed">
                  <code data-testid="content-display">{shareData.content}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Footer actions */}
          <div className="text-center space-y-3 px-2">
            <Button
              onClick={onNavigateHome}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-sm h-10"
              data-testid="button-back-home"
            >
              <Home className="h-4 w-4 mr-2" />
              Create Your Own Share
            </Button>

            <p className="text-xs text-gray-400">This content will be automatically deleted when the timer expires.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
