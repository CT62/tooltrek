// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.tool.deleteMany();
  await prisma.collection.deleteMany();

  // Create collections
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        name: 'Bricklayer Starter Kit',
        category: 'bricklaying',
        price: 899,
        items: 28,
        rating: 4.9,
        reviews: 156,
        description: 'Complete set for professional block laying with premium trowels, levels, and safety gear',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Electrician Pro Pack',
        category: 'electrical',
        price: 1299,
        items: 42,
        rating: 4.8,
        reviews: 203,
        description: 'Professional-grade electrical tools including multimeters, wire strippers, and safety equipment',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Plasterer Essential Set',
        category: 'plastering',
        price: 749,
        items: 24,
        rating: 4.7,
        reviews: 98,
        description: 'Everything needed for smooth finishes including hawks, trowels, and mixing tools',
        popular: false,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Plumber Complete Kit',
        category: 'plumbing',
        price: 1099,
        items: 35,
        rating: 4.9,
        reviews: 187,
        description: 'Comprehensive plumbing toolkit with pipe wrenches, cutters, and specialized fittings',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Carpenter Master Set',
        category: 'carpentry',
        price: 1499,
        items: 52,
        rating: 5.0,
        reviews: 245,
        description: 'Premium woodworking tools including saws, chisels, planes, and measuring equipment',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Bricklayer Advanced Kit',
        category: 'bricklaying',
        price: 1399,
        items: 38,
        rating: 4.8,
        reviews: 112,
        description: 'Advanced toolkit with laser levels, professional mixers, and specialty cutting tools',
        popular: false,
      },
    }),
  ]);

  console.log(`Created ${collections.length} collections`);

  // Add some sample tools to the first collection
  await prisma.tool.createMany({
    data: [
      {
        name: 'Brick Trowel',
        brand: 'Marshalltown',
        price: 45.99,
        description: 'Professional brick laying trowel with comfort grip',
        collectionId: collections[0].id,
      },
      {
        name: 'Spirit Level 48"',
        brand: 'Stanley',
        price: 89.99,
        description: 'Heavy-duty aluminum spirit level for precise measurements',
        collectionId: collections[0].id,
      },
      {
        name: 'Jointing Tool',
        brand: 'OX Tools',
        price: 12.99,
        description: 'Professional jointing tool for perfect mortar joints',
        collectionId: collections[0].id,
      },
    ],
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
