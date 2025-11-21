"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/useCart";

// Componente Header con tipado estricto
export default function Header(): React.JSX.Element {
  const pathname: string = usePathname();
  const { getTotalItems } = useCart();
  const totalItems: number = getTotalItems();

  // Verificar si la ruta actual está activa
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Inicio */}
        <Link
          href="/"
          className={`text-xl font-bold transition-colors ${
            isActive("/")
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          Min Commerce
        </Link>

        {/* Navegación */}
        <div className="flex items-center gap-4">
          {/* Link a Carrito */}
          <Link
            href="/cart"
            className={`relative flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${
              isActive("/cart")
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

