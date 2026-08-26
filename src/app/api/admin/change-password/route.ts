import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { requireAdminSession } from '@/lib/requireAdmin';
import { getAdminByEmail, updateAdminPassword } from '@/lib/db/adminRepository';
import { changePasswordSchema } from '@/lib/validations/product';

export async function POST(request: NextRequest) {
  const { session, response } = await requireAdminSession();
  if (!session) return response;

  const body = await request.json().catch(() => null);
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  const admin = await getAdminByEmail(session.user.email ?? '');
  if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

  const valid = await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash);
  if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });

  const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await updateAdminPassword(admin.id, newHash);

  return NextResponse.json({ success: true });
}
