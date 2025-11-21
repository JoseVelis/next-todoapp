"use client";

import { useCart } from "../context/useCart";
import CartItemDetails from "./CartItemDetails";
import CartItemActions from "./CartItemActions";
import { formatPrice } from "../utils/formatPrice";

// Tipo para las props del componente con tipado estricto
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Componente CartSidebar con tipado estricto
export default function CartSidebar({
  isOpen,
  onClose,
}: CartSidebarProps): React.JSX.Element {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPrice: number = getTotalPrice();
  const formattedTotalPrice: string = formatPrice(totalPrice);
  const isEmpty: boolean = items.length === 0;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-800 sm:w-96 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Carrito de Compras
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-label="Cerrar carrito"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 h-16 w-16 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Tu carrito está vacío
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="space-y-3">
                    <CartItemDetails item={item} />
                    <CartItemActions item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con total y botones */}
          {!isEmpty && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Total:
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formattedTotalPrice}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Proceder al Pago
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

