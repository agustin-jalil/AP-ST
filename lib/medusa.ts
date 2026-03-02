// Utility functions to interact with Medusa JS backend

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

export interface MedusaCategory {
  id: string
  name: string
  description: string
  handle: string
  rank: number
  parent_category_id: string | null
  created_at: string
  updated_at: string
  metadata: any
  parent_category: any
  category_children: any[]
}

export interface MedusaProduct {
  id: string
  title: string
  description: string
  handle: string
  thumbnail: string
  images: Array<{ url: string }>
  variants: Array<{
    id: string
    title: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
  }>
  metadata: any
}

export interface MedusaCategoriesResponse {
  product_categories: MedusaCategory[]
  count: number
  offset: number
  limit: number
}

export interface MedusaProductsResponse {
  products: MedusaProduct[]
  count: number
  offset: number
  limit: number
}

/**
 * Fetch all product categories from Medusa
 */
export async function getCategories(): Promise<MedusaCategory[]> {
  console.log("[v0] MEDUSA_BACKEND_URL:", MEDUSA_BACKEND_URL)
  console.log("[v0] MEDUSA_PUBLISHABLE_KEY:", MEDUSA_PUBLISHABLE_KEY ? "Set" : "Not set")

  if (!MEDUSA_BACKEND_URL) {
    console.error("[v0] NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured")
    console.error("[v0] Please add the environment variable in the Vars section of the sidebar")
    return []
  }

  try {
    const url = `${MEDUSA_BACKEND_URL}/store/product-categories`
    console.log("[v0] Fetching categories from:", url)

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (MEDUSA_PUBLISHABLE_KEY) {
      headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store", // Always fetch fresh data
    })

    console.log("[v0] Response status:", response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Failed to fetch categories:", response.status, response.statusText)
      console.error("[v0] Error response:", errorText)
      return []
    }

    const data: MedusaCategoriesResponse = await response.json()
    console.log("[v0] Successfully fetched", data.product_categories?.length || 0, "categories")
    return data.product_categories || []
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error("[v0] Network error: Check if the Medusa backend URL is correct and accessible")
      console.error("[v0] Current URL:", MEDUSA_BACKEND_URL)
      console.error("[v0] This could be a CORS issue or the backend might be down")
    }
    return []
  }
}

/**
 * Fetch products by category ID from Medusa
 */
export async function getProductsByCategory(categoryId: string): Promise<MedusaProduct[]> {
  if (!MEDUSA_BACKEND_URL) {
    console.error("[v0] NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured")
    return []
  }

  try {
    const url = `${MEDUSA_BACKEND_URL}/store/products?category_id[]=${categoryId}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (MEDUSA_PUBLISHABLE_KEY) {
      headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store", // Always fetch fresh data
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch products:", response.status, response.statusText)
      return []
    }

    const data: MedusaProductsResponse = await response.json()
    return data.products || []
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}

/**
 * Fetch a single product by ID or handle from Medusa
 */
export async function getProductById(idOrHandle: string): Promise<MedusaProduct | null> {
  if (!MEDUSA_BACKEND_URL) {
    console.error("[v0] NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured")
    return null
  }

  try {
    const url = `${MEDUSA_BACKEND_URL}/store/products/${idOrHandle}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (MEDUSA_PUBLISHABLE_KEY) {
      headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch product:", response.status, response.statusText)
      return null
    }

    const data = await response.json()
    return data.product
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
}

/**
 * Fetch all products from Medusa
 */
export async function getAllProducts(): Promise<MedusaProduct[]> {
  if (!MEDUSA_BACKEND_URL) {
    console.error("[v0] NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured")
    return []
  }

  try {
    const url = `${MEDUSA_BACKEND_URL}/store/products?limit=100`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (MEDUSA_PUBLISHABLE_KEY) {
      headers["x-publishable-api-key"] = MEDUSA_PUBLISHABLE_KEY
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("[v0] Failed to fetch all products:", response.status, response.statusText)
      return []
    }

    const data: MedusaProductsResponse = await response.json()
    return data.products || []
  } catch (error) {
    console.error("[v0] Error fetching all products:", error)
    return []
  }
}

/**
 * Format price from Medusa format (cents) to display format
 */
export function formatPrice(amount: number, currencyCode = "USD"): string {
  const price = amount / 100 // Convert from cents to dollars
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(price)
}

/**
 * Transform Medusa product to internal Product type
 */
export function transformMedusaProduct(medusaProduct: MedusaProduct): any {
  const variant = medusaProduct.variants?.[0]
  const price = variant?.prices?.[0]
  const priceAmount = price ? price.amount / 100 : 0

  return {
    id: medusaProduct.handle,
    name: medusaProduct.title,
    category: "productos",
    price: priceAmount,
    description: medusaProduct.description || "",
    images: medusaProduct.images?.map((img) => img.url) || [medusaProduct.thumbnail],
    specifications: [
      { label: "SKU", value: variant?.id || "N/A" },
      { label: "Variante", value: variant?.title || "Estándar" },
      ...(medusaProduct.metadata?.specifications || []),
    ],
    whatsInBox: medusaProduct.metadata?.whatsInBox || [],
    includedServices: medusaProduct.metadata?.includedServices || [],
    relatedProducts: medusaProduct.metadata?.relatedProducts || [],
    features: medusaProduct.metadata?.features || [],
    colors: medusaProduct.metadata?.colors || [],
  }
}
