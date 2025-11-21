"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../models/products";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/useCart";

// Tipo para las props del componente con tipado estricto
interface ProductCardProps {
  product: Product;
}

// Componente ProductCard con tipado estricto
export default function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const { addItem, removeItem, isProductInCart } = useCart();
  // Formatear el precio con formato de moneda
  const formattedPrice: string = formatPrice(product.price);

  // Determinar si hay stock disponible
  const isInStock: boolean = product.stock > 0;
  const stockStatus: string = isInStock ? "En stock" : "Agotado";
  const isInCart: boolean = isProductInCart(product.id);

  const handleCartAction = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      removeItem(product.id);
    } else {
      addItem(product, 1);
    }
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Imagen del producto */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Contenido del card */}
      <div className="flex flex-1 flex-col p-4">
        {/* Categoría */}
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          {product.category}
        </span>

        {/* Nombre del producto */}
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
          {product.name}
        </h3>

        {/* Descripción (truncada) */}
        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
          {product.description}
        </p>

        {/* Precio */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formattedPrice}
          </span>
        </div>

        {/* Rating y Reviews (si están disponibles) */}
        {product.rating !== undefined && product.reviews !== undefined && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({product.reviews} reseñas)
            </span>
          </div>
        )}

        {/* Stock */}
        <div className="mt-auto flex items-center justify-between">
          <span
            className={`text-sm font-medium ${
              isInStock
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {stockStatus}
          </span>
          {isInStock && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.stock} disponibles
            </span>
          )}
        </div>

        {/* Botón de acción */}
        <button
          type="button"
          onClick={handleCartAction}
          disabled={!isInStock}
          className={`mt-4 w-full rounded-lg px-4 py-2 font-semibold text-white transition-colors ${
            isInStock
              ? isInCart
                ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-400 dark:bg-gray-600"
          }`}
        >
          {isInStock
            ? isInCart
              ? "Quitar del carrito"
              : "Añadir al carrito"
            : "Agotado"}
        </button>
      </div>
    </Link>
  );
}

