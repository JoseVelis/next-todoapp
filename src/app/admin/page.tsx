import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { prisma } from "@/src/lib/prisma"

async function getAdminData() {
  const [users, orders, products] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: { orders: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        },
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        category: true,
        _count: {
          select: { orderItems: true }
        }
      }
    })
  ])

  return { users, orders, products }
}

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  const { users, orders, products } = await getAdminData()

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalUsers = users.length
  const lowStockProducts = products.filter(p => p.stock < 10)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona usuarios, órdenes y productos</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Órdenes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos con Stock Bajo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{lowStockProducts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido Principal */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Órdenes</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Órdenes Recientes</CardTitle>
                <CardDescription>
                  Últimas órdenes realizadas por los usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">Orden #{order.id.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.user?.name} ({order.user?.email})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Badge variant={
                          order.status === 'PENDING' ? 'secondary' :
                          order.status === 'CONFIRMED' ? 'default' :
                          order.status === 'SHIPPED' ? 'outline' :
                          order.status === 'DELIVERED' ? 'default' : 'destructive'
                        }>
                          {order.status === 'PENDING' ? 'Pendiente' :
                           order.status === 'CONFIRMED' ? 'Confirmada' :
                           order.status === 'SHIPPED' ? 'Enviada' :
                           order.status === 'DELIVERED' ? 'Entregada' : 'Cancelada'}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Registrados</CardTitle>
                <CardDescription>
                  Lista de todos los usuarios de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user._count.orders} orden{user._count.orders !== 1 ? 'es' : ''}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {user.role === 'ADMIN' ? 'Admin' : 'Usuario'}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventario de Productos</CardTitle>
                <CardDescription>
                  Gestión del inventario y productos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-sm text-muted-foreground">
                          {product._count.orderItems} venta{product._count.orderItems !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <Badge variant={product.stock < 10 ? 'destructive' : 'secondary'}>
                          Stock: {product.stock}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}