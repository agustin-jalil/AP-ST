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
