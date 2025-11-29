// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required', success: false },
        { status: 400 }
      );
    }

    if (validateCredentials(username, password)) {
      try {
        const token = createToken(username);
        return NextResponse.json({ token, success: true });
      } catch (error) {
        return NextResponse.json(
          { error: 'Server configuration error. Please contact administrator.', success: false },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid credentials', success: false },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error', success: false },
      { status: 500 }
    );
  }
}
