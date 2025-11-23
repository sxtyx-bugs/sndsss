import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: "Share ID is required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      {
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
      },
    )

    const { data, error } = await supabase.from("messages").select("*").eq("id", id).single()

    if (error || !data) {
      return NextResponse.json({ error: "Share not found or expired" }, { status: 404 })
    }

    const expiresAt = new Date(data.expires_at)
    if (new Date() > expiresAt) {
      return NextResponse.json({ error: "Share has expired" }, { status: 410 })
    }

    return NextResponse.json({
      id: data.id,
      content: data.encrypted_data,
      expiresAt: data.expires_at,
      createdAt: data.created_at,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
