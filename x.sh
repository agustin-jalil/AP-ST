#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────
# Migración: ecomerce-front — quitar Medusa, dejar catálogo sintético
# Ejecutar desde la raíz del repo ecomerce-front (donde están app/, lib/, components/, types/)
# ─────────────────────────────────────────────────────────────────

if [ ! -d "app" ] || [ ! -d "lib" ] || [ ! -d "components" ]; then
  echo "ERROR: ejecutá este script desde la raíz de ecomerce-front (no se encontró app/, lib/ o components/)"
  exit 1
fi

echo "==> 1/6 Eliminando todo rastro de Medusa"
rm -f lib/medusa.ts
rm -rf lib/medusa
rm -f types/medusa.ts
rm -f MEDUSA_SETUP.md

echo "==> 2/6 Creando capa de catálogo sintético (lib/catalog)"
mkdir -p lib/catalog

cat > lib/catalog/data.ts << 'EOF'
import type { Product } from "@/types/product"

export interface Category {
  id: string
  handle: string
  name: string
  description: string
}

// Datos sintéticos — pensados para integrarse luego con un microservicio
// de catálogo propio del ecosistema (mismo contrato de fetch que hoy usa Medusa).
export const CATEGORIES: Category[] = [
  { id: "cat_audio", handle: "audio", name: "Audio", description: "Auriculares y parlantes inteligentes" },
  { id: "cat_wearables", handle: "wearables", name: "Wearables", description: "Relojes y bandas conectadas" },
  { id: "cat_computacion", handle: "computacion", name: "Computación", description: "Notebooks y equipos de escritorio" },
  { id: "cat_tablets", handle: "tablets", name: "Tablets", description: "Tablets para trabajo y creatividad" },
]

export type CatalogProduct = Product & { categoryHandle: string }

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "aurora-buds-pro",
    name: "Aurora Buds Pro",
    categoryHandle: "audio",
    category: "Audio",
    price: 129,
    originalPrice: 149,
    description: "Auriculares inalámbricos con cancelación de ruido adaptativa.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    specifications: [
      { label: "Autonomía", value: "8 h (32 h con estuche)" },
      { label: "Resistencia", value: "IPX4" },
      { label: "Conectividad", value: "Bluetooth 5.3" },
    ],
    whatsInBox: [
      { name: "Auriculares", image: "/placeholder.svg" },
      { name: "Estuche de carga", image: "/placeholder.svg" },
      { name: "Cable USB-C", image: "/placeholder.svg" },
    ],
    includedServices: [
      {
        name: "Garantía extendida",
        description: "12 meses adicionales de cobertura",
        icon: "🛡️",
        trialDuration: "Incluido",
      },
    ],
    relatedProducts: [{ id: "halo-watch-se", name: "Halo Watch SE", image: "/placeholder.svg", price: 219 }],
    features: ["Cancelación activa de ruido", "Modo transparencia", "Carga rápida: 10 min = 2 h de uso"],
    colors: [
      { name: "Negro", value: "#1a1a1a" },
      { name: "Blanco", value: "#f5f5f5" },
    ],
  },
  {
    id: "sonic-bar-2",
    name: "Sonic Bar 2",
    categoryHandle: "audio",
    category: "Audio",
    price: 249,
    description: "Barra de sonido compacta con graves potenciados y soporte multiroom.",
    images: ["/placeholder.svg"],
    specifications: [
      { label: "Canales", value: "2.1" },
      { label: "Potencia", value: "120W RMS" },
      { label: "Conectividad", value: "Wi-Fi, Bluetooth, óptico" },
    ],
    whatsInBox: [
      { name: "Barra de sonido", image: "/placeholder.svg" },
      { name: "Control remoto", image: "/placeholder.svg" },
    ],
    includedServices: [],
    relatedProducts: [{ id: "aurora-buds-pro", name: "Aurora Buds Pro", image: "/placeholder.svg", price: 129 }],
    features: ["Multiroom", "Modo noche", "Control por voz"],
    colors: [{ name: "Negro", value: "#1a1a1a" }],
  },
  {
    id: "halo-watch-se",
    name: "Halo Watch SE",
    categoryHandle: "wearables",
    category: "Wearables",
    price: 219,
    description: "Reloj inteligente con monitoreo de salud y GPS integrado.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    specifications: [
      { label: "Pantalla", value: "OLED 1.9\"" },
      { label: "Batería", value: "Hasta 5 días" },
      { label: "Resistencia", value: "5 ATM" },
    ],
    whatsInBox: [
      { name: "Reloj", image: "/placeholder.svg" },
      { name: "Cargador magnético", image: "/placeholder.svg" },
    ],
    includedServices: [
      { name: "App de salud Pro", description: "3 meses gratis", icon: "❤️", trialDuration: "3 meses" },
    ],
    relatedProducts: [{ id: "pulse-band-fit", name: "Pulse Band Fit", image: "/placeholder.svg", price: 79 }],
    features: ["GPS integrado", "Monitor de oxígeno en sangre", "Notificaciones inteligentes"],
    colors: [
      { name: "Grafito", value: "#3a3a3a" },
      { name: "Azul medianoche", value: "#1d2b4f" },
    ],
  },
  {
    id: "pulse-band-fit",
    name: "Pulse Band Fit",
    categoryHandle: "wearables",
    category: "Wearables",
    price: 79,
    description: "Banda de actividad ligera con seguimiento de sueño y frecuencia cardíaca.",
    images: ["/placeholder.svg"],
    specifications: [
      { label: "Batería", value: "Hasta 12 días" },
      { label: "Resistencia", value: "IP68" },
    ],
    whatsInBox: [{ name: "Banda", image: "/placeholder.svg" }],
    includedServices: [],
    relatedProducts: [{ id: "halo-watch-se", name: "Halo Watch SE", image: "/placeholder.svg", price: 219 }],
    features: ["Seguimiento de sueño", "Frecuencia cardíaca 24/7", "Alertas de inactividad"],
    colors: [
      { name: "Negro", value: "#1a1a1a" },
      { name: "Coral", value: "#e2725b" },
    ],
  },
  {
    id: "drift-14-slim",
    name: "Drift 14 Slim",
    categoryHandle: "computacion",
    category: "Computación",
    price: 1349,
    originalPrice: 1499,
    description: "Notebook ultraliviana de 14\" pensada para productividad y movilidad.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    specifications: [
      { label: "Procesador", value: "8 núcleos, hasta 4.2 GHz" },
      { label: "RAM", value: "16 GB" },
      { label: "Almacenamiento", value: "512 GB SSD" },
      { label: "Peso", value: "1.2 kg" },
    ],
    whatsInBox: [
      { name: "Notebook", image: "/placeholder.svg" },
      { name: "Cargador USB-C 65W", image: "/placeholder.svg" },
    ],
    includedServices: [
      { name: "Soporte prioritario", description: "Línea directa de soporte técnico", icon: "🎧", trialDuration: "12 meses" },
    ],
    relatedProducts: [{ id: "lumen-tab-11", name: "Lumen Tab 11", image: "/placeholder.svg", price: 589 }],
    features: ["Pantalla 14\" 2.8K", "Teclado retroiluminado", "Hasta 18 h de batería"],
    colors: [
      { name: "Gris espacial", value: "#4a4a4a" },
      { name: "Plata", value: "#d6d6d6" },
    ],
  },
  {
    id: "forge-desktop-x",
    name: "Forge Desktop X",
    categoryHandle: "computacion",
    category: "Computación",
    price: 1899,
    description: "Equipo de escritorio compacto orientado a creación de contenido.",
    images: ["/placeholder.svg"],
    specifications: [
      { label: "Procesador", value: "12 núcleos, hasta 5.1 GHz" },
      { label: "RAM", value: "32 GB" },
      { label: "Almacenamiento", value: "1 TB SSD" },
    ],
    whatsInBox: [
      { name: "Torre", image: "/placeholder.svg" },
      { name: "Mouse y teclado", image: "/placeholder.svg" },
    ],
    includedServices: [],
    relatedProducts: [{ id: "drift-14-slim", name: "Drift 14 Slim", image: "/placeholder.svg", price: 1349 }],
    features: ["Refrigeración silenciosa", "Wi-Fi 6E", "Expandible"],
    colors: [{ name: "Negro", value: "#1a1a1a" }],
  },
  {
    id: "lumen-tab-11",
    name: "Lumen Tab 11",
    categoryHandle: "tablets",
    category: "Tablets",
    price: 589,
    description: "Tablet de 11\" con lápiz incluido, ideal para trabajo creativo.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    specifications: [
      { label: "Pantalla", value: "11\" Liquid Retina" },
      { label: "Almacenamiento", value: "256 GB" },
      { label: "Batería", value: "Hasta 10 h" },
    ],
    whatsInBox: [
      { name: "Tablet", image: "/placeholder.svg" },
      { name: "Lápiz óptico", image: "/placeholder.svg" },
      { name: "Cargador USB-C", image: "/placeholder.svg" },
    ],
    includedServices: [
      { name: "Almacenamiento en la nube", description: "200 GB incluidos", icon: "☁️", trialDuration: "6 meses" },
    ],
    relatedProducts: [{ id: "lumen-tab-mini", name: "Lumen Tab Mini", image: "/placeholder.svg", price: 399 }],
    features: ["Compatible con lápiz óptico", "Modo escritorio", "Chip de alto rendimiento"],
    colors: [
      { name: "Gris espacial", value: "#4a4a4a" },
      { name: "Blanco estelar", value: "#f0ede4" },
    ],
  },
  {
    id: "lumen-tab-mini",
    name: "Lumen Tab Mini",
    categoryHandle: "tablets",
    category: "Tablets",
    price: 399,
    description: "Tablet compacta de 8\", liviana y fácil de transportar.",
    images: ["/placeholder.svg"],
    specifications: [
      { label: "Pantalla", value: "8.3\"" },
      { label: "Almacenamiento", value: "128 GB" },
      { label: "Peso", value: "290 g" },
    ],
    whatsInBox: [{ name: "Tablet", image: "/placeholder.svg" }],
    includedServices: [],
    relatedProducts: [{ id: "lumen-tab-11", name: "Lumen Tab 11", image: "/placeholder.svg", price: 589 }],
    features: ["Diseño compacto", "Lectura cómoda", "Carga rápida"],
    colors: [{ name: "Gris espacial", value: "#4a4a4a" }],
  },
]
EOF

cat > lib/catalog/index.ts << 'EOF'
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
EOF

echo "==> 3/6 Actualizando components/header.tsx (sin Medusa, sin branding Apple)"
cat > components/header.tsx << 'EOF'
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import ShoppingBagModal from "./shopping-bag-modal"
import { getCategories, type Category } from "@/lib/catalog"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  const staticNavItems = [{ label: "Store", href: "/" }]

  const categoryNavItems = categories.map((cat) => ({
    label: cat.name,
    href: `/categoria/${cat.handle}`,
  }))

  const additionalNavItems = [{ label: "Support", href: "#" }]

  const navItems = [...staticNavItems, ...categoryNavItems, ...additionalNavItems]

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-sm font-semibold text-white tracking-tight">Nimbus Store</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {isLoadingCategories ? (
              <span className="text-sm text-gray-500">Cargando categorías...</span>
            ) : (
              navItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-gray-300 hover:text-white transition">
                  {item.label}
                </Link>
              ))
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-900 rounded-full transition">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-gray-900 rounded-full transition"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>

              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96">
                  <ShoppingBagModal onClose={() => setIsCartOpen(false)} />
                </div>
              )}
            </div>

            <button className="p-2 hover:bg-gray-900 rounded-full transition lg:hidden">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
EOF

echo "==> 4/6 Actualizando app/page.tsx, app/categoria/[categoria]/page.tsx, app/products/[handle]/page.tsx"

cat > app/page.tsx << 'EOF'
import ProductHero from "@/components/product-hero"

export default function Home() {
  const products = [
    {
      title: "Aurora Buds Pro",
      subtitle: "Silencio total, sonido total.",
      description: "",
      image: "/placeholder.svg",
      darkBg: true,
      buttons: ["Conocer más", "Comprar"],
    },
    {
      title: "Halo Watch SE",
      subtitle: "Tu salud, en tu muñeca.",
      description: "Monitoreo continuo, batería de hasta 5 días.",
      image: "/placeholder.svg",
      darkBg: false,
      buttons: ["Conocer más", "Comprar"],
    },
    {
      title: "Drift 14 Slim",
      subtitle: "Potencia que no pesa.",
      description: "",
      image: "/placeholder.svg",
      darkBg: true,
      buttons: ["Conocer más", "Comprar"],
    },
    {
      title: "Lumen Tab 11",
      subtitle: "Crea sin límites.",
      description: "",
      image: "/placeholder.svg",
      darkBg: false,
      buttons: ["Conocer más", "Comprar"],
    },
  ]

  return (
    <main className="w-full">
      {products.map((product, index) => (
        <ProductHero key={index} {...product} />
      ))}
    </main>
  )
}
EOF

cat > app/categoria/\[categoria\]/page.tsx << 'EOF'
import { CatalogHeader } from "@/components/catalog/catalog-header"
import { CatalogLineup } from "@/components/catalog/catalog-lineup"
import { CatalogCloserLook } from "@/components/catalog/catalog-closer-look"
import { CatalogFeatures } from "@/components/catalog/catalog-features"
import { CatalogFooter } from "@/components/catalog/catalog-footer"
import { notFound } from "next/navigation"
import { getCategories, getCategoryByHandle, getProductsByCategory, formatPrice } from "@/lib/catalog"

interface PageProps {
  params: Promise<{
    categoria: string
  }>
}

export default async function CatalogPage({ params }: PageProps) {
  const { categoria } = await params

  const category = await getCategoryByHandle(categoria)

  if (!category) {
    notFound()
  }

  const categoryProducts = await getProductsByCategory(category.handle)

  const gradients = [
    "bg-gradient-to-br from-orange-400 to-orange-600",
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-purple-200 to-pink-200",
    "bg-gradient-to-br from-blue-500 to-indigo-700",
    "bg-gradient-to-br from-slate-400 to-slate-600",
    "bg-gradient-to-br from-cyan-100 to-cyan-200",
  ]

  const products = categoryProducts.map((product, index) => ({
    id: index + 1,
    name: product.name,
    description: product.description,
    price: `Desde ${formatPrice(product.price)}`,
    specs: product.specifications[0]?.value ?? "Ver especificaciones",
    color: gradients[index % gradients.length],
    lightColor: index % 2 === 0,
    handle: product.id,
  }))

  const models = categoryProducts.map((product) => ({
    name: product.name,
    shortName: product.name.split(" ").slice(-1)[0],
  }))

  const allCategories = await getCategories()

  const features = [
    { id: 1, title: "Especificaciones y duración", description: "Descubre los detalles técnicos", icon: "📋" },
    { id: 2, title: "Diseño premium", description: "Calidad y elegancia en cada detalle", icon: "✨" },
    { id: 3, title: "Rendimiento excepcional", description: "Potencia para todo lo que necesitas", icon: "⚡" },
    { id: 4, title: "Tecnología avanzada", description: "Lo último en innovación", icon: "🚀" },
  ]

  void allCategories

  return (
    <main className="min-h-screen bg-white">
      <CatalogHeader title={category.name} models={models} />
      <CatalogLineup products={products} />
      <CatalogCloserLook
        title={`Conoce ${category.name}`}
        description={category.description || `Descubre toda la línea de ${category.name}`}
      />
      <CatalogFeatures features={features} />
      <CatalogFooter />
    </main>
  )
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    categoria: category.handle,
  }))
}
EOF

cat > app/products/\[handle\]/page.tsx << 'EOF'
import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { WhatsInBox } from "@/components/product/whats-in-box"
import { IncludedServices } from "@/components/product/included-services"
import { RelatedProducts } from "@/components/product/related-products"
import { getProductById, getAllProducts } from "@/lib/catalog"

interface ProductPageProps {
  params: Promise<{
    handle: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params

  const product = await getProductById(handle)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>

      {product.whatsInBox.length > 0 && (
        <section className="container mx-auto px-4">
          <WhatsInBox items={product.whatsInBox} />
        </section>
      )}

      {product.includedServices && product.includedServices.length > 0 && (
        <section className="container mx-auto px-4">
          <IncludedServices services={product.includedServices} />
        </section>
      )}

      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <RelatedProducts products={product.relatedProducts} />
        </section>
      )}
    </main>
  )
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    handle: product.id,
  }))
}
EOF

echo "==> 5/6 Actualizando branding genérico en layout, footer y catalog-footer"

sed -i.bak "s/title: 'TodoApple'/title: 'Nimbus Store'/; s/description: 'TodoApple'/description: 'Nimbus Store'/; s/generator: 'TodoApple'/generator: 'Nimbus Store'/" app/layout.tsx
rm -f app/layout.tsx.bak

cat > components/catalog/catalog-footer.tsx << 'EOF'
export function CatalogFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm text-gray-600">© 2025 Nimbus Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
EOF

# Footer principal: reemplazo manual de links y copyright
cat > components/footer.tsx << 'EOF'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-sm mb-4">Shop</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="/categoria/computacion" className="hover:text-black">
                  Computación
                </Link>
              </li>
              <li>
                <Link href="/categoria/audio" className="hover:text-black">
                  Audio
                </Link>
              </li>
              <li>
                <Link href="/categoria/tablets" className="hover:text-black">
                  Tablets
                </Link>
              </li>
              <li>
                <Link href="/categoria/wearables" className="hover:text-black">
                  Wearables
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Account</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-black">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Support</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Help
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-8">
          <p className="text-xs text-gray-600 text-center">© 2025 Nimbus Store. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
EOF

echo "==> 6/6 Verificando que no quede ninguna referencia a Medusa"
if grep -ril "medusa" app components lib types 2>/dev/null | grep -v ".bak"; then
  echo "ADVERTENCIA: quedaron referencias a 'medusa' en los archivos listados arriba. Revisar manualmente."
else
  echo "OK: no quedan referencias a Medusa en app/, components/, lib/, types/"
fi

echo ""
echo "Listo. Resumen:"
echo "  - Eliminado:  lib/medusa.ts, lib/medusa/, types/medusa.ts, MEDUSA_SETUP.md"
echo "  - Creado:     lib/catalog/data.ts, lib/catalog/index.ts (8 productos sintéticos, 4 categorías)"
echo "  - Actualizado: components/header.tsx, components/footer.tsx, components/catalog/catalog-footer.tsx"
echo "  - Actualizado: app/page.tsx, app/categoria/[categoria]/page.tsx, app/products/[handle]/page.tsx, app/layout.tsx"
echo "  - Sin tocar:  checkout-flow.tsx, tracking-view.tsx, lib/shipping/*, lib/adapters/* (no dependen de Medusa)"
echo ""
echo "Pendiente de tu parte: correr 'pnpm install && pnpm dev' y revisar visualmente."