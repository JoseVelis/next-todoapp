import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validar datos
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    // Crear el usuario (sin hashear contraseña por simplicidad en desarrollo)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        // En producción, hashea la contraseña:
        // password: await bcrypt.hash(password, 12)
      }
    })

    // Remover la contraseña de la respuesta
    const { ...userWithoutPassword } = user

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}