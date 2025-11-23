interface ShareData {
  id: string
  url: string
  expiresAt: string
}

interface ViewShareData {
  id: string
  content: string
  expiresAt: string
  createdAt: string
}

export async function createShare(payload: {
  originalContent: string
  expiresAt: string
}): Promise<ShareData> {
  console.log("[v0] createShare called with:", {
    contentLength: payload.originalContent.length,
    expiresAt: payload.expiresAt,
  })

  const response = await fetch("/api/shares", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  console.log("[v0] API response status:", response.status, response.statusText)

  if (!response.ok) {
    const contentType = response.headers.get("content-type")
    console.log("[v0] Error response content-type:", contentType)

    if (contentType?.includes("application/json")) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create share")
    } else {
      // If not JSON, read as text to see what we got
      const text = await response.text()
      console.error("[v0] Non-JSON error response:", text.substring(0, 200))
      throw new Error(`Server error: ${text.substring(0, 100)}`)
    }
  }

  return response.json()
}

export async function getShare(shareId: string): Promise<ViewShareData> {
  const url = `/api/shares/${shareId}`
  console.log("[v0] getShare: Fetching from URL:", url)

  const response = await fetch(url)
  console.log("[v0] getShare: Response status:", response.status, response.statusText)
  console.log("[v0] getShare: Response headers:", Object.fromEntries(response.headers.entries()))

  if (!response.ok) {
    const contentType = response.headers.get("content-type")
    let errorMessage = "Failed to fetch share"

    if (contentType?.includes("application/json")) {
      const error = await response.json()
      errorMessage = error.error || errorMessage
    } else {
      const text = await response.text()
      console.error("[v0] Non-JSON error response:", text.substring(0, 200))
      errorMessage = `Server returned ${response.status}: ${text.substring(0, 100)}`
    }

    console.error("[v0] getShare: Error:", errorMessage)
    throw new Error(errorMessage)
  }
  // </CHANGE>

  return response.json()
}
