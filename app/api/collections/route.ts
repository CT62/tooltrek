// app/api/collections/route.ts
import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/data';

export async function GET() {
  try {
    const collections = await getCollections();
    
    // Log what we're getting
    console.log('Collections from DB:', collections);
    
    // Ensure we always return an array
    if (!collections || !Array.isArray(collections)) {
      console.error('getCollections() did not return an array:', collections);
      return NextResponse.json([]);
    }
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    // Return empty array instead of error object
    return NextResponse.json([]);
  }
}

export const dynamic = 'force-dynamic';
