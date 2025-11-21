# E-commerce App con Next.js

Aplicación de e-commerce completa construida con Next.js 16, Prisma, shadcn/ui, y más.

## Características

- ✅ **App Router** de Next.js con Server Components
- ✅ **Base de datos** con Prisma y Neon (PostgreSQL)
- ✅ **Checkout completo** con validación usando Zod
- ✅ **Estado global** con Context API y localStorage
- ✅ **UI moderna** con shadcn/ui y Tailwind CSS
- ✅ **Gestión de inventario** y órdenes
- ✅ **Responsive design**

## Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar base de datos
1. Crea una cuenta en [Neon](https://neon.tech)
2. Crea una nueva base de datos PostgreSQL
3. Copia la connection string
4. Actualiza `.env`:
```env
DATABASE_URL="tu-connection-string-de-neon"
```

### 3. Ejecutar migraciones
```bash
npx prisma migrate dev --name init
```

### 4. Poblar base de datos
```bash
npm run db:seed
```

### 5. Ejecutar aplicación
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── cart/              # Página del carrito
│   ├── checkout/          # Checkout y confirmación
│   ├── orders/            # Lista de órdenes
│   └── product/[id]/      # Detalle de producto
├── components/            # Componentes UI (shadcn/ui)
├── prisma/                # Schema y migraciones
├── src/
│   ├── context/           # Context API para carrito
│   ├── lib/              # Utilidades (Prisma client)
│   ├── models/           # Tipos TypeScript
│   └── utils/            # Funciones helper
└── public/products/      # Imágenes de productos
```

## Tecnologías utilizadas

- **Next.js 16** - Framework React con App Router
- **Prisma** - ORM para base de datos
- **Neon** - Base de datos PostgreSQL en la nube
- **shadcn/ui** - Componentes UI modernos
- **Tailwind CSS** - Estilos utilitarios
- **Zod** - Validación de esquemas
- **React Hook Form** - Manejo de formularios
- **TypeScript** - Tipado estático

## Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint
- `npm run db:seed` - Poblar base de datos

## Funcionalidades implementadas

### 🛒 Carrito de compras
- Agregar/remover productos
- Persistencia con localStorage
- Cálculo automático de totales

### 💳 Checkout
- Formulario validado con Zod
- Creación de órdenes en DB
- Actualización de inventario
- Confirmación de pedido

### 📦 Gestión de productos
- CRUD completo con Prisma
- Imágenes optimizadas con Next.js
- Búsqueda y filtrado

### 🎨 UI/UX
- Diseño responsivo
- Tema oscuro/claro
- Componentes accesibles con shadcn/ui

## Despliegue

La aplicación está lista para desplegar en Vercel, Netlify, o cualquier plataforma que soporte Next.js.

### Variables de entorno requeridas:
- `DATABASE_URL` - Connection string de Neon

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
