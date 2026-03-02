import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { WhatsInBox } from "@/components/product/whats-in-box"
import { IncludedServices } from "@/components/product/included-services"
import { RelatedProducts } from "@/components/product/related-products"
import { getProductById, getAllProducts, transformMedusaProduct } from "@/lib/medusa"

interface ProductPageProps {
  params: Promise<{
    handle: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params

  const medusaProduct = await getProductById(handle)

  if (!medusaProduct) {
    notFound()
  }

  const product = transformMedusaProduct(medusaProduct)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* What's in the Box */}
      {product.whatsInBox.length > 0 && (
        <section className="container mx-auto px-4">
          <WhatsInBox items={product.whatsInBox} />
        </section>
      )}

      {/* Included Services */}
      {product.includedServices && product.includedServices.length > 0 && (
        <section className="container mx-auto px-4">
          <IncludedServices services={product.includedServices} />
        </section>
      )}

      {/* Related Products */}
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
    handle: product.handle,
  }))
}
