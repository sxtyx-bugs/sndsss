"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Copy, Clock, Share, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import DotGrid from "@/components/DotGrid"

interface ShareResult {
  id: string
  url: string
  expiresAt: string
}

export default function ShareApp() {
  const [content, setContent] = useState("")
  const [expirationTime, setExpirationTime] = useState("30")
  const [shareResult, setShareResult] = useState<ShareResult | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please enter some text to share.",
        variant: "destructive",
      })
      return
    }

    setIsSharing(true)

    try {
      let expirationMs = 0

      if (expirationTime.endsWith("s")) {
        expirationMs = Number.parseInt(expirationTime.slice(0, -1)) * 1000
      } else {
        expirationMs = Number.parseInt(expirationTime) * 60 * 1000
      }

      const expiresAt = new Date(Date.now() + expirationMs)

      const { createShare } = await import("@/lib/api")

      const result = await createShare({
        originalContent: content,
        expiresAt: expiresAt.toISOString(),
      })

      setShareResult({
        id: result.id,
        url: result.url,
        expiresAt: result.expiresAt,
      })
      toast({
        title: "Share Created",
        description: "Your content is ready to share.",
      })
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (error.response && error.response.data) {
        errorMessage = error.response.data.error || error.response.data.message
      }

      toast({
        title: "Failed to Create Share",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        toast({
          title: "Copied!",
          description: "URL copied to clipboard.",
        })
        return
      }

      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        toast({
          title: "Copied!",
          description: "URL copied to clipboard.",
        })
      } else {
        throw new Error("Copy command failed")
      }
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the URL manually",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setContent("")
    setShareResult(null)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <DotGrid dotColor="rgba(34, 197, 94, 0.15)" hoverColor="rgb(34, 197, 94)" dotSize={2} spacing={30} />

      <div className="relative z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-white mb-2" data-testid="title-main">
              Secure Text Sharing
            </h1>
            <p className="text-gray-400">Share text and code snippets with automatic expiration</p>
          </div>

          {!shareResult ? (
            <div className="glass-dark rounded-2xl p-8 mb-6 backdrop-blur-xl bg-black/80 border border-green-500/20 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Share className="h-5 w-5 text-green-400" />
                  Create New Share
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-300">
                    Content to Share
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your text or code here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[200px] font-mono text-sm resize-none bg-black/50 border-green-500/30 text-white placeholder:text-gray-500 focus:border-green-400 focus:ring-green-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration" className="text-gray-300">
                    Expiration Time
                  </Label>
                  <Select value={expirationTime} onValueChange={setExpirationTime}>
                    <SelectTrigger className="bg-black/50 border-green-500/30 text-white focus:border-green-400 focus:ring-green-400/50">
                      <SelectValue placeholder="Select expiration time" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-green-500/30">
                      <SelectItem value="30s" className="text-white hover:bg-green-500/20">
                        30 seconds
                      </SelectItem>
                      <SelectItem value="60s" className="text-white hover:bg-green-500/20">
                        1 minute
                      </SelectItem>
                      <SelectItem value="5" className="text-white hover:bg-green-500/20">
                        5 minutes
                      </SelectItem>
                      <SelectItem value="10" className="text-white hover:bg-green-500/20">
                        10 minutes
                      </SelectItem>
                      <SelectItem value="30" className="text-white hover:bg-green-500/20">
                        30 minutes
                      </SelectItem>
                      <SelectItem value="60" className="text-white hover:bg-green-500/20">
                        1 hour
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-green-400 mt-0.5" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium text-white mb-1">Privacy Notice</p>
                      <p>
                        Your content will be automatically processed for security and will self-destruct after the
                        selected time period. No data is permanently stored.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleShare}
                  disabled={isSharing || !content.trim()}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
                >
                  {isSharing ? "Processing..." : "Create Secure Share"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="glass-dark rounded-2xl p-8 mb-6 backdrop-blur-xl bg-black/80 border border-green-500/40 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-green-400">
                  <Share className="h-5 w-5" />
                  Share Created Successfully
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Share URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={shareResult.url}
                      readOnly
                      className="font-mono text-sm bg-black/50 border-green-500/30 text-white"
                    />
                    <Button
                      onClick={() => handleCopy(shareResult.url)}
                      size="icon"
                      className="bg-green-600 hover:bg-green-500 border-green-500/30"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span>Expires at {new Date(shareResult.expiresAt).toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopy(shareResult.url)}
                    className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={resetForm} className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                    Create Another
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>All shares are automatically deleted after expiration. No permanent storage.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
