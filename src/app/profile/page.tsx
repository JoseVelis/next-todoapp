import { auth } from "@/src/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/src/lib/prisma"

async function getUserOrders(userId: string) {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  })
  return orders
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin')
  }

  const orders = await getUserOrders(session.user.id)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback className="text-2xl">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{session.user.name}</h1>
            <p className="text-muted-foreground">{session.user.email}</p>
            <Badge variant={session.user.role === 'ADMIN' ? 'default' : 'secondary'} className="mt-2">
              {session.user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Información Personal */}
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Tu información de cuenta y preferencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Nombre</label>
                <p className="text-lg">{session.user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-lg">{session.user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Rol</label>
                <p className="text-lg">{session.user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Miembro desde</label>
                <p className="text-lg">{new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4">
              Editar Perfil
            </Button>
          </CardContent>
        </Card>

        {/* Órdenes Recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
            <CardDescription>
              Tus últimas compras realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Aún no has realizado ninguna orden
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Orden #{order.id.slice(-8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
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
                    </div>
                  </div>
                ))}
                {orders.length >= 5 && (
                  <Button variant="outline" className="w-full">
                    Ver Todas las Órdenes
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}