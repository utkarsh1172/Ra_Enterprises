import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return { session: null, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { session, response: null };
}
