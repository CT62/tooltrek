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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tool = await request.json();
    const params = await context.params; // AWAIT params here
    const collectionId = parseInt(params.id);
    const collection = collections.find(c => c.id === collectionId);
    
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const newTool = {
      ...tool,
      id: collection.tools.length > 0 
        ? Math.max(...collection.tools.map(t => t.id)) + 1 
        : 1,
    };

    collection.tools.push(newTool);
    return NextResponse.json(newTool);
  } catch (error) {
    console.error('Error adding tool:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
