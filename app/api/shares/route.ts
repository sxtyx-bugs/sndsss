import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { originalContent, expiresAt } = body

    if (!originalContent || !expiresAt) {
      return NextResponse.json({ error: "Missing required fields: originalContent, expiresAt" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Server configuration error: Missing Supabase credentials" }, { status: 500 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        },
      },
    })

    const messageId = generateUUID()

    const { data, error } = await supabase
      .from("messages")
      .insert({
        id: messageId,
        encrypted_data: originalContent,
        password: "",
        expires_at: expiresAt,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Failed to create share: No data returned" }, { status: 500 })
    }

    const { error: recentShareError } = await supabase.from("recent_shares").insert({
      message_id: data.id,
    })

    if (recentShareError) {
      console.error("[v0] Failed to add to recent_shares:", recentShareError.message)
      // Don't fail the request if recent_shares insert fails
    }

    const { data: allShares, error: countError } = await supabase
      .from("recent_shares")
      .select("id, created_at")
      .order("created_at", { ascending: false })

    if (!countError && allShares && allShares.length > 5) {
      const sharesToDelete = allShares.slice(5)
      const idsToDelete = sharesToDelete.map((s) => s.id)

      const { error: deleteError } = await supabase.from("recent_shares").delete().in("id", idsToDelete)

      if (deleteError) {
        console.error("[v0] Failed to delete old shares:", deleteError.message)
      }
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin
    console.log("[v0] NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)
    console.log("[v0] request.nextUrl.origin:", request.nextUrl.origin)
    console.log("[v0] Using appUrl:", appUrl)
    const shareUrl = `${appUrl}/m/${data.id}`

    return NextResponse.json({
      id: data.id,
      url: shareUrl,
      expiresAt: data.expires_at,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "An unexpected error occurred",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 },
    )
  }
}
