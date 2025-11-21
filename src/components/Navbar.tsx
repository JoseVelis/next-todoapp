"use client";

import Link from "next/link";
import { useCart } from "../context/useCart";
import CartSidebar from "./CartSidebar";

// Tipo para las props del componente con tipado estricto
interface NavbarProps {
  showCartButton?: boolean;
}

// Componente Navbar con tipado estricto
export default function Navbar({ showCartButton = true }: NavbarProps = {}) {
  const { getTotalItems, isCartOpen, openCart, closeCart } = useCart();
  const totalItems: number = getTotalItems();

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            Min Commerce
          </Link>

          {/* Botón del carrito */}
          {showCartButton && (
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label="Ver carrito de compras"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-semibold">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </nav>
      {showCartButton && (
        <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      )}
    </>
  );
}

