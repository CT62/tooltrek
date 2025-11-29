// lib/data.ts
import { prisma } from './prisma';
import { Collection, Tool } from '@/types';

export async function getCollections(): Promise<Collection[]> {
  const collections = await prisma.collection.findMany({
    include: {
      tools: true,
    },
  });
  return collections as Collection[];
}

export async function getCollectionById(id: number): Promise<Collection | null> {
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      tools: true,
    },
  });
  return collection as Collection | null;
}

export async function updateCollection(
  id: number, 
  updates: Partial<Omit<Collection, 'id' | 'tools'>>
): Promise<Collection | null> {
  try {
    const collection = await prisma.collection.update({
      where: { id },
      data: updates,
      include: {
        tools: true,
      },
    });
    return collection as Collection;
  } catch {
    return null;
  }
}

export async function addToolToCollection(
  collectionId: number, 
  tool: Omit<Tool, 'id' | 'collectionId'>
): Promise<Tool | null> {
  try {
    const newTool = await prisma.tool.create({
      data: {
        ...tool,
        collectionId,
      },
    });
    return newTool as Tool;
  } catch (error) {
    console.error('Error adding tool:', error);
    return null;
  }
}

export async function updateToolInCollection(
  collectionId: number, 
  toolId: number, 
  updates: Partial<Omit<Tool, 'id' | 'collectionId'>>
): Promise<Tool | null> {
  try {
    // Verify tool belongs to collection
    const tool = await prisma.tool.findFirst({
      where: {
        id: toolId,
        collectionId,
      },
    });

    if (!tool) return null;

    const updatedTool = await prisma.tool.update({
      where: { id: toolId },
      data: updates,
    });

    return updatedTool as Tool;
  } catch (error) {
    console.error('Error updating tool:', error);
    return null;
  }
}

export async function deleteToolFromCollection(
  collectionId: number, 
  toolId: number
): Promise<boolean> {
  try {
    // Verify tool belongs to collection
    const tool = await prisma.tool.findFirst({
      where: {
        id: toolId,
        collectionId,
      },
    });

    if (!tool) return false;

    await prisma.tool.delete({
      where: { id: toolId },
    });

    return true;
  } catch (error) {
    console.error('Error deleting tool:', error);
    return false;
  }
}
