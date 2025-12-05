// app/api/collections/[id]/tools/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyRequestAuth } from '@/lib/auth';
import { addToolToCollection, getCollectionById } from '@/lib/data';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tool = await request.json();
    const collectionId = parseInt(params.id);
    
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    const collection = await getCollectionById(collectionId);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    if (!tool.name || !tool.brand) {
      return NextResponse.json({ error: 'Invalid tool data' }, { status: 400 });
    }

    const newTool = await addToolToCollection(collectionId, tool);
    
    if (!newTool) {
      return NextResponse.json({ error: 'Failed to add tool' }, { status: 500 });
    }

    return NextResponse.json(newTool);
  } catch (error) {
    console.error('Error adding tool:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
