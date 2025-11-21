import React from 'react';
import Image from "next/image";
import type { CartItem } from "../models/cart";
import { formatPrice } from "../utils/formatPrice";

// Tipo para las props del componente con tipado estricto
interface CartItemDetailsProps {
  item: CartItem;
}

// Componente CartItemDetails con tipado estricto
export default function CartItemDetails({ item }: CartItemDetailsProps): React.JSX.Element {
  const { product, quantity } = item;
  const totalPrice: number = product.price * quantity;
  const formattedPrice: string = formatPrice(product.price);
  const formattedTotalPrice: string = formatPrice(totalPrice);

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      {/* Imagen del producto */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Nombre y categoría */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.category}
          </p>
        </div>

        {/* Precio unitario y total */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Precio unitario:
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {formattedPrice}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Cantidad:
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {quantity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Total:
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {formattedTotalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

