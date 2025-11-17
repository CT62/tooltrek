import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { collections } from '@/lib/data';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string; toolId: string }> }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedTool = await request.json();
    const params = await context.params; // AWAIT params here
    const collectionId = parseInt(params.id);
    const toolId = parseInt(params.toolId);
    
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const toolIndex = collection.tools.findIndex(t => t.id === toolId);
    if (toolIndex === -1) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    collection.tools[toolIndex] = { ...collection.tools[toolIndex], ...updatedTool };
    return NextResponse.json(collection.tools[toolIndex]);
  } catch (error) {
    console.error('Error updating tool:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; toolId: string }> }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params; // AWAIT params here
  const collectionId = parseInt(params.id);
  const toolId = parseInt(params.toolId);
  
  const collection = collections.find(c => c.id === collectionId);
  if (!collection) {
    return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
  }

  collection.tools = collection.tools.filter(t => t.id !== toolId);
  return NextResponse.json({ success: true });
}
