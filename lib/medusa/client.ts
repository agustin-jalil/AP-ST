const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

/**
 * Create headers for Medusa API requests
 */
function createMedusaHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (MEDUSA_PUBLISHABLE_KEY) {
    headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY
  }

  return headers
}

/**
 * Base fetch function for Medusa API
 */
export async function medusaFetch<T>(endpoint: string): Promise<T | null> {
  if (!MEDUSA_BACKEND_URL) {
    console.error("[v0] NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured")
    return null
  }

  try {
    const url = `${MEDUSA_BACKEND_URL}${endpoint}`
    const response = await fetch(url, {
      method: "GET",
      headers: createMedusaHeaders(),
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("[v0] Medusa API error:", response.status, response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching from Medusa:", error)
    return null
  }
}

export { MEDUSA_BACKEND_URL, MEDUSA_PUBLISHABLE_KEY }
