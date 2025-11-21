"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "../models/products";
import type { CartItem, CartContextType } from "../models/cart";

// Clave para localStorage
const CART_STORAGE_KEY: string = "min-commerce.cart";

// Función para cargar el carrito desde localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored: string | null = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed: CartItem[] = JSON.parse(stored);
      return parsed;
    }
  } catch (error) {
    console.error("Error al cargar el carrito desde localStorage:", error);
  }
  return [];
};

// Función para guardar el carrito en localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }
};

// Crear el contexto del carrito
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider del contexto del carrito
export function CartProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Cargar el carrito desde localStorage al inicializar
  useEffect(() => {
    const savedItems: CartItem[] = loadCartFromStorage();
    setItems(savedItems);
    setIsInitialized(true);
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  // Agregar item al carrito
  const addItem = useCallback((product: Product, quantity: number = 1): void => {
    setItems((prevItems: CartItem[]) => {
      const existingItem: CartItem | undefined = prevItems.find(
        (item: CartItem) => item.product.id === product.id
      );

      if (existingItem) {
        // Si ya existe, aumentar la cantidad
        return prevItems.map((item: CartItem) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Si no existe, agregarlo
      return [...prevItems, { product, quantity }];
    });
    // Abrir el carrito automáticamente cuando se añade un producto
    setIsCartOpen(true);
  }, []);

  // Eliminar item del carrito
  const removeItem = useCallback((productId: string): void => {
    setItems((prevItems: CartItem[]) =>
      prevItems.filter((item: CartItem) => item.product.id !== productId)
    );
  }, []);

  // Actualizar cantidad de un item
  const updateQuantity = useCallback((productId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems: CartItem[]) =>
      prevItems.map((item: CartItem) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Limpiar todo el carrito
  const clearCart = useCallback((): void => {
    setItems([]);
  }, []);

  // Obtener total de items
  const getTotalItems = useCallback((): number => {
    return items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  }, [items]);

  // Obtener precio total
  const getTotalPrice = useCallback((): number => {
    return items.reduce(
      (total: number, item: CartItem) => total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  // Verificar si un producto está en el carrito
  const isProductInCart = useCallback((productId: string): boolean => {
    return items.some((item: CartItem) => item.product.id === productId);
  }, [items]);

  // Abrir el carrito
  const openCart = useCallback((): void => {
    setIsCartOpen(true);
  }, []);

  // Cerrar el carrito
  const closeCart = useCallback((): void => {
    setIsCartOpen(false);
  }, []);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isProductInCart,
    openCart,
    closeCart,
    isCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook personalizado useCart
export function useCart(): CartContextType {
  const context: CartContextType | undefined = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
}

