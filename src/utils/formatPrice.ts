/**
 * Helper para formatear precios con tipado estricto
 * @param price - Precio numérico a formatear
 * @returns String formateado como moneda en formato EUR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

