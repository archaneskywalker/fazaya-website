import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  const isValid = verifyToken(token);

  return NextResponse.json({ valid: isValid });
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-token');
  return response;
}
