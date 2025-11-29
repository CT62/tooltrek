// app/api/collections/[id]/tools/[toolId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyRequestAuth } from '@/lib/auth';
import { updateToolInCollection, deleteToolFromCollection, getCollectionById } from '@/lib/data';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; toolId: string } }
) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedTool = await request.json();
    const collectionId = parseInt(params.id);
    const toolId = parseInt(params.toolId);
    
    if (isNaN(collectionId) || isNaN(toolId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const collection = await getCollectionById(collectionId);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const result = await updateToolInCollection(collectionId, toolId, updatedTool);
    
    if (!result) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating tool:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; toolId: string } }
) {
  if (!verifyRequestAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const collectionId = parseInt(params.id);
    const toolId = parseInt(params.toolId);
    
    if (isNaN(collectionId) || isNaN(toolId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const collection = await getCollectionById(collectionId);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const success = await deleteToolFromCollection(collectionId, toolId);
    
    if (!success) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tool:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
