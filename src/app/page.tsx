import ProductList from "@/src/components/ProductList";
import { getProducts } from "@/src/models/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductList products={products} title="Nuestros Productos" />
      </div>
    </main>
  );
}

