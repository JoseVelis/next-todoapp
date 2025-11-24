"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/useCart";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Componente Header con tipado estricto
export default function Header(): React.JSX.Element {
  const pathname: string = usePathname();
  const { getTotalItems } = useCart();
  const totalItems: number = getTotalItems();
  const { data: session, status } = useSession();

  // Verificar si la ruta actual está activa
  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo/Inicio */}
        <Link
          href="/"
          className={`text-xl font-bold transition-colors ${
            isActive("/")
              ? "text-blue-600 dark:text-blue-400"
              : "text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          Min Commerce
        </Link>

        {/* Navegación */}
        <div className="flex items-center gap-4">
          {/* Link a Carrito */}
          <Link
            href="/cart"
            className={`relative flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors ${
              isActive("/cart")
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Autenticación */}
          {status === "loading" ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                    <AvatarFallback>
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && <p className="font-medium">{session.user.name}</p>}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Perfil</Link>
                </DropdownMenuItem>
                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Panel Admin</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Registrarse</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

