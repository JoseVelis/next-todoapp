"use client";

import { useState } from "react";
import { useCart } from "@/src/context/useCart";
import type { Product } from "@/src/models/products";
import { Button } from "../../../../components/ui/button";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addItem, removeItem, isProductInCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const isInStock: boolean = product.stock > 0;
  const isInCart: boolean = isProductInCart(product.id);

  const handleIncreaseQuantity = (): void => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCartAction = (): void => {
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product, quantity);
    }
  };

  if (!isInStock) {
    return (
      <div className="text-red-600 dark:text-red-400 font-semibold">
        Producto agotado
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selector de cantidad */}
      <div>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
          Cantidad
        </span>
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="h-10 w-10 rounded-r-none"
          >
            -
          </Button>
          <span className="min-w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
            {quantity}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleIncreaseQuantity}
            disabled={quantity >= product.stock}
            className="h-10 w-10 rounded-l-none"
          >
            +
          </Button>
        </div>
      </div>

      {/* Botón del carrito */}
      <Button
        onClick={handleCartAction}
        className="w-full"
        disabled={!isInStock}
      >
        {isInCart ? "Remover del carrito" : "Agregar al carrito"}
      </Button>

      {/* Enlace al checkout */}
      {isInCart && (
        <Button asChild variant="outline" className="w-full">
          <a href="/checkout">Ir al checkout</a>
        </Button>
      )}
    </div>
  );
}