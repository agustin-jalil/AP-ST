import ProductHero from "@/components/product-hero"

export default function Home() {
  const products = [
    {
      title: "iPhone 17 Pro",
      subtitle: "All Pro.",
      description: "",
      image: "/iphone-17-pro-orange-product.jpg",
      darkBg: true,
      buttons: ["Learn more", "Buy"],
    },
    {
      title: "iPhone Air",
      subtitle: "The thinnest iPhone ever.",
      description: "With the power you can inside.",
      image: "/iphone-air-silver-product-in-hand.jpg",
      darkBg: false,
      buttons: ["Learn more", "Buy"],
    },
    {
      title: 'MacBook Pro 14"',
      subtitle: "Supercharged by M4.",
      description: "",
      image: "/macbook-pro-14-inch-black-product.jpg",
      darkBg: true,
      buttons: ["Learn more", "Buy"],
    },
    {
      title: "WATCH SERIES 11",
      subtitle: "The ultimate care companion.",
      description: "",
      image: "/apple-watch-series-11-blue.jpg",
      darkBg: false,
      buttons: ["Learn more", "Buy"],
    },
    {
      title: "iPad Pro",
      subtitle: "Powerful. Colorful. Versatile.",
      description: "",
      image: "/ipad-pro-tablet-product.jpg",
      darkBg: true,
      buttons: ["Learn more", "Buy"],
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
