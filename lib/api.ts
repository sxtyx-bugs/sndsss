export async function createShare(data: { originalContent: string; expiresAt: string }) {
  const response = await fetch("/api/shares", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new Error(error.error || `Failed to create share: ${response.status}`)
  }

  return response.json()
}

export async function getShare(id: string) {
  const response = await fetch(`/api/shares/${id}`, {
    method: "GET",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new Error(error.error || `Failed to fetch share: ${response.status}`)
  }

  return response.json()
}
