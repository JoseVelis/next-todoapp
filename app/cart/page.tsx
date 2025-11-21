"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/src/components/Navbar";

// Página del carrito
export default function CartPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Carrito de Compras
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Usa el botón del carrito en la barra de navegación para ver tus productos.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Volver a la tienda
          </button>
        </div>
      </main>
    </>
  );
}

