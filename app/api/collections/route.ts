// app/api/collections/route.ts
import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/data';

export async function GET() {
  console.log('=== API Route Called ===');
  
  try {
    console.log('Calling getCollections()...');
    const collections = await getCollections();
    
    console.log('Collections returned:', collections);
    console.log('Is array?', Array.isArray(collections));
    console.log('Length:', collections?.length);
    
    // Ensure we return an array
    if (!Array.isArray(collections)) {
      console.error('ERROR: Not an array!', typeof collections);
      return NextResponse.json([]);
    }
    
    return NextResponse.json(collections);
  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : error);
    console.error('Full error:', error);
    
    // Return empty array on error
    return NextResponse.json([]);
  }
}

export const dynamic = 'force-dynamic';
