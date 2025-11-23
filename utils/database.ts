import { getSupabaseClient } from "./supabase"
import type { Message } from "./supabase"

export async function storeMessage(
  id: string,
  encryptedData: string,
  password: string,
  expiresAt: Date,
  expiryDuration: number,
): Promise<void> {
  try {
    const supabase = getSupabaseClient()

    const { error } = await supabase.from("messages").insert({
      id,
      encrypted_data: encryptedData,
      password,
      expires_at: expiresAt.toISOString(),
      expiry_duration: expiryDuration,
      read: false,
    })

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      throw new Error(`Failed to store message: ${error.message}`)
    }
  } catch (error) {
    console.error("[v0] Error storing message:", error)
    throw error
  }
}

export async function getMessage(messageId: string): Promise<Message | null> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase.from("messages").select("*").eq("id", messageId).single()

    if (error && error.code !== "PGRST116") {
      console.error("[v0] Supabase fetch error:", error)
      throw error
    }

    return data || null
  } catch (error) {
    console.error("[v0] Error fetching message:", error)
    return null
  }
}

export async function deleteMessage(messageId: string): Promise<void> {
  try {
    const supabase = getSupabaseClient()

    const { error } = await supabase
      .from("messages")
      .update({ read: true, read_at: new Date().toISOString() })
      .eq("id", messageId)

    if (error) {
      console.error("[v0] Supabase update error:", error)
      throw error
    }
  } catch (error) {
    console.error("[v0] Error deleting message:", error)
    throw error
  }
}
