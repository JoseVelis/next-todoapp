import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl">¡Pedido confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Gracias por tu compra. Recibirás un email de confirmación pronto.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Continuar comprando</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/orders">Ver mis pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}