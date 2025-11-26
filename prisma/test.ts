import { prisma } from '../lib/prisma';

async function main() {
  const collections = await prisma.collection.findMany();
  console.log(collections);
}

main().catch(console.error).finally(() => prisma.$disconnect());

