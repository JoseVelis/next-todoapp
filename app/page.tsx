"use client";

import Navbar from "@/src/components/Navbar";
import ProductList from "@/src/components/ProductList";
import { mockProducts } from "@/src/models/products";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ProductList products={mockProducts} title="Nuestros Productos" />
        </div>
      </main>
    </>
  );
}
