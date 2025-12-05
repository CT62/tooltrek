// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  // Clear existing data
  await prisma.tool.deleteMany();
  await prisma.collection.deleteMany();
  
  // Create collections with starter and pro versions
  const collections = await Promise.all([
    // Bricklaying
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
        name: 'Bricklayer Pro Kit',
        category: 'bricklaying',
        price: 1499,
        items: 45,
        rating: 5.0,
        reviews: 203,
        description: 'Advanced toolkit with laser levels, professional mixers, specialty cutting tools, and premium accessories',
        popular: true,
      },
    }),
    
    // Electrical
    prisma.collection.create({
      data: {
        name: 'Electrician Starter Pack',
        category: 'electrical',
        price: 799,
        items: 32,
        rating: 4.7,
        reviews: 134,
        description: 'Essential electrical tools including multimeters, wire strippers, and basic safety equipment',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Electrician Pro Pack',
        category: 'electrical',
        price: 1599,
        items: 52,
        rating: 4.9,
        reviews: 287,
        description: 'Professional-grade electrical tools with advanced multimeters, cable testers, thermal imaging, and premium safety gear',
        popular: true,
      },
    }),
    
    // Plastering
    prisma.collection.create({
      data: {
        name: 'Plasterer Starter Set',
        category: 'plastering',
        price: 649,
        items: 20,
        rating: 4.6,
        reviews: 89,
        description: 'Essential plastering tools including hawks, trowels, and basic mixing equipment',
        popular: false,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Plasterer Pro Set',
        category: 'plastering',
        price: 1199,
        items: 35,
        rating: 4.8,
        reviews: 145,
        description: 'Professional plastering kit with premium trowels, powered mixers, advanced finishing tools, and specialty accessories',
        popular: true,
      },
    }),
    
    // Plumbing
    prisma.collection.create({
      data: {
        name: 'Plumber Starter Kit',
        category: 'plumbing',
        price: 849,
        items: 28,
        rating: 4.7,
        reviews: 142,
        description: 'Essential plumbing toolkit with pipe wrenches, cutters, and basic fittings',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Plumber Pro Kit',
        category: 'plumbing',
        price: 1699,
        items: 48,
        rating: 4.9,
        reviews: 256,
        description: 'Comprehensive professional plumbing set with hydraulic tools, drain cameras, pressure testers, and specialized equipment',
        popular: true,
      },
    }),
    
    // Carpentry
    prisma.collection.create({
      data: {
        name: 'Carpenter Starter Set',
        category: 'carpentry',
        price: 949,
        items: 35,
        rating: 4.8,
        reviews: 178,
        description: 'Essential woodworking tools including saws, chisels, hammers, and measuring equipment',
        popular: true,
      },
    }),
    prisma.collection.create({
      data: {
        name: 'Carpenter Pro Set',
        category: 'carpentry',
        price: 1899,
        items: 62,
        rating: 5.0,
        reviews: 312,
        description: 'Premium master woodworking collection with power tools, precision measuring instruments, specialty planes, and complete joinery set',
        popular: true,
      },
    }),
  ]);
  
  console.log(`Created ${collections.length} collections (5 trades with starter and pro versions each)`);
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
