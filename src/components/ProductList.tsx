import type { Product } from "../models/products";
import ProductCard from "./ProductCard";

// Tipo para las props del componente con tipado estricto
interface ProductListProps {
  products: Product[];
  title?: string;
  className?: string;
}

// Componente ProductList con tipado estricto
export default function ProductList({
  products,
  title,
  className = "",
}: ProductListProps): React.JSX.Element {
  // Validar que el array no esté vacío
  const hasProducts: boolean = products.length > 0;

  return (
    <section className={`w-full ${className}`}>
      {/* Título opcional */}
      {title && (
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      )}

      {/* Mensaje si no hay productos */}
      {!hasProducts && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No hay productos disponibles
          </p>
        </div>
      )}

      {/* Grilla responsiva de productos */}
      {hasProducts && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

