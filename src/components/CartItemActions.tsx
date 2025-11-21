"use client";

import React from 'react';
import type { CartItem } from "../models/cart";
import { useCart } from "../context/useCart";

// Tipo para las props del componente con tipado estricto
interface CartItemActionsProps {
  item: CartItem;
}

// Componente CartItemActions con tipado estricto
export default function CartItemActions({ item }: CartItemActionsProps): React.JSX.Element {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  // Manejar aumento de cantidad
  const handleIncrease = (): void => {
    updateQuantity(product.id, quantity + 1);
  };

  // Manejar disminución de cantidad
  const handleDecrease = (): void => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  // Manejar eliminación del producto
  const handleRemove = (): void => {
    removeItem(product.id);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Controles de cantidad */}
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
        {/* Botón disminuir */}
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className={`px-3 py-2 text-lg font-semibold transition-colors ${
            quantity <= 1
              ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-label="Disminuir cantidad"
        >
          −
        </button>

        {/* Cantidad actual */}
        <span className="min-w-[3rem] text-center font-semibold text-gray-900 dark:text-gray-100">
          {quantity}
        </span>

        {/* Botón aumentar */}
        <button
          type="button"
          onClick={handleIncrease}
          disabled={quantity >= product.stock}
          className={`px-3 py-2 text-lg font-semibold transition-colors ${
            quantity >= product.stock
              ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      {/* Botón eliminar */}
      <button
        type="button"
        onClick={handleRemove}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        aria-label={`Eliminar ${product.name} del carrito`}
      >
        Eliminar
      </button>
    </div>
  );
}

