// lib/auth.ts
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// CRITICAL: Set these in Vercel Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || '';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

if (!JWT_SECRET) {
  console.error('WARNING: JWT_SECRET not set! Authentication will not work.');
}

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('WARNING: Admin credentials not set!');
}

export interface JWTPayload {
  username: string;
  role: string;
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createToken(username: string): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }
  
  return jwt.sign(
    { username, role: 'admin' } as JWTPayload,
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): JWTPayload | null {
  if (!JWT_SECRET) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function verifyRequestAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;

  const token = authHeader.split(' ')[1];
  if (!token) return false;

  return verifyToken(token) !== null;
}
