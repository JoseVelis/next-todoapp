import Image from "next/image";
import { notFound } from "next/navigation";
import ProductTag from "@/src/components/ProductTag";
import { getProductBySlug } from "@/src/models/products";
import type { Product } from "@/src/models/products";
import { formatPrice } from "@/src/utils/formatPrice";
import ProductActions from "./ProductActions";

// Página de detalle de producto con ruta dinámica
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  const { id } = await params;
  const product: Product | null = await getProductBySlug(id);

  if (!product) {
    notFound();
  }

  const isInStock: boolean = product.stock > 0;
  const formattedPrice: string = formatPrice(product.price);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Botón volver */}
        <a
          href="/"
          className="mb-6 inline-block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          ← Volver
        </a>

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
              {isInStock && <ProductTag label="En Stock" variant="sale" />}
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
              <span className={`text-sm font-semibold ${isInStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isInStock ? `${product.stock} en stock` : 'Agotado'}
              </span>
            </div>

            {/* Acciones del carrito */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
