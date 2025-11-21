import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    slug: "laptop-gaming-pro",
    name: "Laptop Gaming Pro",
    description: "Laptop potente para gaming con procesador de última generación y tarjeta gráfica dedicada",
    price: 1299.99,
    image: "/products/laptop-gaming.jpg",
    category: "Electrónica",
    stock: 15,
    rating: 4.5,
    reviews: 124,
  },
  {
    slug: "smartphone-ultra",
    name: "Smartphone Ultra",
    description: "Teléfono inteligente con pantalla OLED, 128GB de almacenamiento y cámara de 64MP",
    price: 799.99,
    image: "/products/smartphone.jpg",
    category: "Electrónica",
    stock: 32,
    rating: 4.7,
    reviews: 89,
  },
  {
    slug: "auriculares-inalambricos",
    name: "Auriculares Inalámbricos",
    description: "Auriculares con cancelación de ruido activa y batería de 30 horas",
    price: 199.99,
    image: "/products/headphones.jpg",
    category: "Audio",
    stock: 45,
    rating: 4.6,
    reviews: 203,
  },
  {
    slug: "tablet-pro-12",
    name: "Tablet Pro 12",
    description: "Tablet profesional con pantalla de 12 pulgadas y stylus incluido",
    price: 899.99,
    image: "/products/tablet.jpg",
    category: "Electrónica",
    stock: 20,
    rating: 4.4,
    reviews: 67,
  },
  {
    slug: "smartwatch-fitness",
    name: "Smartwatch Fitness",
    description: "Reloj inteligente con monitor de ritmo cardíaco y GPS integrado",
    price: 299.99,
    image: "/products/smartwatch.jpg",
    category: "Wearables",
    stock: 28,
    rating: 4.3,
    reviews: 156,
  },
  {
    slug: "teclado-mecanico-rgb",
    name: "Teclado Mecánico RGB",
    description: "Teclado mecánico con switches personalizables e iluminación RGB",
    price: 149.99,
    image: "/products/keyboard.jpg",
    category: "Periféricos",
    stock: 38,
    rating: 4.8,
    reviews: 312,
  },
  {
    slug: "mouse-gaming",
    name: "Mouse Gaming",
    description: "Mouse ergonómico con sensor de alta precisión y 8 botones programables",
    price: 79.99,
    image: "/products/mouse.jpg",
    category: "Periféricos",
    stock: 52,
    rating: 4.5,
    reviews: 189,
  },
  {
    slug: "monitor-4k-27",
    name: "Monitor 4K 27\"",
    description: "Monitor profesional con resolución 4K y tecnología HDR",
    price: 449.99,
    image: "/products/monitor.jpg",
    category: "Monitores",
    stock: 12,
    rating: 4.6,
    reviews: 94,
  },
  {
    slug: "camara-dslr",
    name: "Cámara DSLR",
    description: "Cámara réflex digital con lente 24-70mm incluido",
    price: 1599.99,
    image: "/products/camera.jpg",
    category: "Fotografía",
    stock: 8,
    rating: 4.9,
    reviews: 45,
  },
  {
    slug: "altavoz-bluetooth",
    name: "Altavoz Bluetooth",
    description: "Altavoz portátil con sonido 360° y resistencia al agua IPX7",
    price: 129.99,
    image: "/products/speaker.jpg",
    category: "Audio",
    stock: 41,
    rating: 4.4,
    reviews: 178,
  },
  {
    slug: "zapatillas-puma-naranjas",
    name: "Zapatillas Puma Naranjas",
    description: "Zapatillas deportivas Puma en color naranja, cómodas y resistentes para uso diario y deportivo",
    price: 89.99,
    image: "/products/zapatillas-puma.jpg",
    category: "Calzado",
    stock: 25,
    rating: 4.7,
    reviews: 156,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });