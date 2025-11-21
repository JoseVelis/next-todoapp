"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/src/components/Navbar";
import ProductTag from "@/src/components/ProductTag";
import { mockProducts } from "@/src/models/products";
import type { Product } from "@/src/models/products";
import { formatPrice } from "@/src/utils/formatPrice";
import { useCart } from "@/src/context/useCart";

// Página de detalle de producto
export default function ProductDetailPage(): React.JSX.Element {
  const params = useParams();
  const router = useRouter();
  const { addItem, removeItem, isProductInCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const productId = params.id as string | string[];
  const idString: string = Array.isArray(productId) ? productId[0] : productId;

  useEffect(() => {
    const foundProduct: Product | undefined = mockProducts.find(
      (p: Product) => p.id === idString
    );

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [idString]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Producto no encontrado
            </h1>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Volver al inicio
            </button>
          </div>
        </main>
      </>
    );
  }

  const isInStock: boolean = product.stock > 0;
  const formattedPrice: string = formatPrice(product.price);
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Botón volver */}
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Volver
          </button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Imagen del producto */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Información del producto */}
            <div className="flex flex-col gap-6">
              {/* Categoría y tag */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {product.category}
                </span>
                {isInStock && <ProductTag label="En Oferta" variant="sale" />}
              </div>

              {/* Nombre */}
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {product.name}
              </h1>

              {/* Rating (si existe) */}
              {product.rating !== undefined && product.reviews !== undefined && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reseñas)
                  </span>
                </div>
              )}

              {/* Precio */}
              <div>
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {formattedPrice}
                </span>
              </div>

              {/* Descripción */}
              <div>
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Descripción
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div>
                <span
                  className={`text-sm font-medium ${
                    isInStock
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isInStock
                    ? `${product.stock} unidades disponibles`
                    : "Agotado"}
                </span>
              </div>

              {/* Controles de cantidad y botón agregar */}
              <div className="space-y-4">
                {/* Selector de cantidad */}
                <div className="flex items-center gap-4">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Cantidad:
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600">
                    <button
                      type="button"
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      className={`px-3 py-2 text-lg font-semibold transition-colors ${
                        quantity <= 1
                          ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      −
                    </button>
                    <span className="min-w-[3rem] text-center font-semibold text-gray-900 dark:text-gray-100">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncreaseQuantity}
                      disabled={quantity >= product.stock}
                      className={`px-3 py-2 text-lg font-semibold transition-colors ${
                        quantity >= product.stock
                          ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Botón agregar/quitar del carrito */}
                <button
                  type="button"
                  onClick={handleCartAction}
                  disabled={!isInStock}
                  className={`w-full rounded-lg px-6 py-4 text-lg font-semibold text-white transition-colors ${
                    isInStock
                      ? isInCart
                        ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      : "cursor-not-allowed bg-gray-400 dark:bg-gray-600"
                  }`}
                >
                  {isInStock
                    ? isInCart
                      ? "Quitar del Carrito"
                      : "Añadir al Carrito"
                    : "Agotado"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

