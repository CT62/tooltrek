// app/api/collections/route.ts
import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/data';

export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

// This is needed for Vercel to know this is a dynamic route
export const dynamic = 'force-dynamic';
