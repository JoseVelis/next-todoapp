"use client";

import { useCart } from "@/src/context/useCart";
import CartItemDetails from "@/src/components/CartItemDetails";
import CartItemActions from "@/src/components/CartItemActions";
import { formatPrice } from "@/src/utils/formatPrice";
import Link from "next/link";

// Página del carrito
export default function CartPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice: number = getTotalPrice();
  const formattedTotalPrice: string = formatPrice(totalPrice);
  const isEmpty: boolean = items.length === 0;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          Carrito de Compras
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4 h-16 w-16 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              Tu carrito está vacío
            </p>
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.product.id} className="space-y-3">
                  <CartItemDetails item={item} />
                  <CartItemActions item={item} />
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Total:
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formattedTotalPrice}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="/checkout"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-center block"
                >
                  Proceder al Checkout
                </a>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
