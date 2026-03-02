"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import ShoppingBagModal from "./shopping-bag-modal"
import { getCategories, type MedusaCategory } from "@/lib/medusa"

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [categories, setCategories] = useState<MedusaCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categoryError, setCategoryError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        console.log("[v0] Header: Starting to fetch categories...")
        const cats = await getCategories()
        console.log("[v0] Header: Received", cats.length, "categories")
        setCategories(cats)

        if (cats.length === 0 && !process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
          setCategoryError("Backend not configured")
        }
      } catch (error) {
        console.error("[v0] Error loading categories in header:", error)
        setCategoryError("Failed to load categories")
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  const staticNavItems = [{ label: "Store", href: "#" }]

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
          {/* Apple Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.02-1.62-.59-3.04-.59-1.42 0-1.77.59-3.05.59-1.3-.02-2.29-1.33-3.12-2.47C5.82 16.64 5 13.77 5 10.5c0-3.5 2.04-5.38 4.04-5.38 1.33 0 2.36.77 3.15.77.78 0 2.01-.8 3.39-.8 2.11 0 3.68 1.38 4.6 3.3-2.1 1.23-2.8 3.72-2.8 5.38 0 2.14.88 3.63 2.32 4.72M12 2c.78 0 1.58-.5 2.42-1.5.8-.9 1.48-2.16 1.48-2.5 0-.36-.12-1-.5-1-2.18 0-3.4 1.5-4.4 1.5-.4 0-1.5-.36-2.5 0-.5.12-.74.5-.74 1 0 1.36 1.48 2.4 2.5 3.5.9.8 1.5 1.5 2.5 1.5" />
            </svg>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {isLoadingCategories ? (
              <span className="text-sm text-gray-500">Loading categories...</span>
            ) : categoryError ? (
              <span className="text-sm text-red-400">{categoryError}</span>
            ) : (
              navItems.map((item) => (
                <Link key={item.label} href={item.href} className="text-sm text-gray-300 hover:text-white transition">
                  {item.label}
                </Link>
              ))
            )}
          </div>

          {/* Right side - Search and Shopping Bag */}
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

              {/* Shopping Bag Modal */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96">
                  <ShoppingBagModal onClose={() => setIsCartOpen(false)} />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
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
