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
    console.log("[v0] API /api/shares POST called")

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error("[v0] Failed to parse request body:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { originalContent, expiresAt } = body

    if (!originalContent || !expiresAt) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Missing required fields: originalContent, expiresAt" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error: Missing Supabase credentials" }, { status: 500 })
    }

    console.log("[v0] Supabase URL:", supabaseUrl.substring(0, 20) + "...")

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

    console.log("[v0] Creating share in Supabase...", {
      id: messageId,
      contentLength: originalContent.length,
      expiresAt,
    })

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
      console.error("[v0] Supabase error:", error)
      return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 })
    }

    if (!data) {
      console.error("[v0] No data returned from Supabase")
      return NextResponse.json({ error: "Failed to create share: No data returned" }, { status: 500 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin
    const shareUrl = `${appUrl}/m/${data.id}`

    console.log("[v0] Share created successfully:", { id: data.id, url: shareUrl })

    return NextResponse.json({
      id: data.id,
      url: shareUrl,
      expiresAt: data.expires_at,
    })
  } catch (error: any) {
    console.error("[v0] Unexpected error creating share:", error)
    return NextResponse.json(
      {
        error: error?.message || "An unexpected error occurred",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 },
    )
  }
}
