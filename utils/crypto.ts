// AES-256-GCM encryption using Web Crypto API

export async function encryptMessage(message: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const password = crypto.getRandomValues(new Uint8Array(32))
  const key = await deriveKey(password, salt)
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encoder = new TextEncoder()
  const data = encoder.encode(message)

  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data)

  const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(ciphertext), salt.length + iv.length)

  const encryptedData = btoa(String.fromCharCode(...combined))
  const passwordBase64 = btoa(String.fromCharCode(...password))

  return {
    encrypted: encryptedData,
    password: passwordBase64,
  }
}

export async function decryptMessage(encryptedData: string, password: string) {
  try {
    const combined = new Uint8Array(
      atob(encryptedData)
        .split("")
        .map((c) => c.charCodeAt(0)),
    )
    const passwordArray = new Uint8Array(
      atob(password)
        .split("")
        .map((c) => c.charCodeAt(0)),
    )

    const salt = combined.slice(0, 16)
    const iv = combined.slice(16, 28)
    const ciphertext = combined.slice(28)

    const key = await deriveKey(passwordArray, salt)

    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext)

    const decoder = new TextDecoder()
    return decoder.decode(plaintext)
  } catch (error) {
    console.error("Decryption failed:", error)
    throw new Error("Failed to decrypt message")
  }
}

async function deriveKey(password: Uint8Array, salt: Uint8Array) {
  const baseKey = await crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"])

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: salt,
      iterations: 100000,
    },
    baseKey,
    256,
  )

  return crypto.subtle.importKey("raw", derivedBits, "AES-GCM", false, ["encrypt", "decrypt"])
}

export function generateMessageId(length = 48): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  const array = crypto.getRandomValues(new Uint8Array(length))
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }
  return result
}
