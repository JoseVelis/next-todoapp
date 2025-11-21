import React from "react";
import type { ReactNode } from "react";

// Tipo para las props del componente con tipado estricto
interface ProductTagProps {
  label: string;
  variant?: "sale" | "new" | "popular" | "default";
  className?: string;
}

// Componente ProductTag con tipado estricto
export default function ProductTag({
  label,
  variant = "default",
  className = "",
}: ProductTagProps): React.JSX.Element {
  // Definir estilos según la variante con tipado estricto
  const getVariantStyles = (variantType: NonNullable<ProductTagProps["variant"]>): string => {
    const variantStyles: Record<
      NonNullable<ProductTagProps["variant"]>,
      string
    > = {
      sale: "bg-red-500 text-white dark:bg-red-600",
      new: "bg-green-500 text-white dark:bg-green-600",
      popular: "bg-purple-500 text-white dark:bg-purple-600",
      default: "bg-gray-500 text-white dark:bg-gray-600",
    };

    return variantStyles[variantType];
  };

  const variantStyles: string = getVariantStyles(variant);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${variantStyles} ${className}`}
      role="status"
      aria-label={`Etiqueta: ${label}`}
    >
      {label}
    </span>
  );
}

