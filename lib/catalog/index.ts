import { CATEGORIES, PRODUCTS, type Category, type CatalogProduct } from "./data"
import type { Product } from "@/types/product"

export type { Category, CatalogProduct }

// Las firmas son async a propósito: mantienen el mismo contrato que tendrá
// el futuro fetch a un microservicio real de catálogo (consistente con el
// patrón TenantGuard + x-organization-id usado por el resto del ecosistema).

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES
}

export async function getCategoryByHandle(handle: string): Promise<Category | null> {
  return CATEGORIES.find((cat) => cat.handle === handle.toLowerCase()) ?? null
}

export async function getProductsByCategory(categoryHandle: string): Promise<CatalogProduct[]> {
  return PRODUCTS.filter((p) => p.categoryHandle === categoryHandle)
}

export async function getProductById(idOrHandle: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.id === idOrHandle)
  if (!product) return null
  const { categoryHandle: _categoryHandle, ...rest } = product
  return rest
}

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS.map(({ categoryHandle: _categoryHandle, ...rest }) => rest)
}

export function formatPrice(amount: number, currencyCode = "USD"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount)
}
