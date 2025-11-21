# Configuración de Neon

## Paso 1: Obtener tu connection string de Neon

1. Ve a [Neon Dashboard](https://console.neon.tech)
2. Selecciona tu proyecto
3. En la sección "Connection string", copia la URL que comienza con `postgresql://`
4. Asegúrate de que la URL incluya `?sslmode=require` al final

## Paso 2: Actualizar el archivo .env

Reemplaza el contenido de `.env` con:

```
DATABASE_URL="tu-neon-connection-string-aqui"
```

Por ejemplo:
```
DATABASE_URL="postgresql://neon_user:password@ep-cold-cloud-123456.us-east-1.neon.tech/neon_db?sslmode=require"
```

## Paso 3: Ejecutar migraciones

Una vez que hayas actualizado `.env` con tu connection string real, ejecuta:

```bash
npx prisma migrate dev --name init
```

Esto hará lo siguiente:
- Conectará a tu BD de Neon
- Creará las tablas necesarias (Product, Order, OrderItem)
- Generará el cliente de Prisma

## Paso 4: Poblar la base de datos (opcional)

Para agregar productos de ejemplo:

```bash
npm run db:seed
```

## Paso 5: Iniciar la aplicación

```bash
npm run dev
```

¡Listo! Tu aplicación estará conectada a Neon.

---

## Notas importantes:

- **NO commits .env con datos sensibles** - Ya está en `.gitignore`
- **Usa variables de entorno en producción** - Agrega `DATABASE_URL` en tu proveedor de hosting
- **Las migraciones crean el schema automáticamente** - No necesitas crear tablas manualmente
- **El seed es opcional** - Puedes agregar productos por la UI o API

