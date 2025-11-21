import type { Product } from "./products";

// Tipo para un item en el carrito
export type CartItem = {
  product: Product;
  quantity: number;
};

// Tipo para el contexto del carrito
export type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isProductInCart: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
};

