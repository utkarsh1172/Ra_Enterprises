import { readJson, writeJson } from './jsonStore';
import type { AdminUser } from '@/types';

const FILE = 'admin.json';

export async function listAdmins(): Promise<AdminUser[]> {
  return readJson<AdminUser[]>(FILE);
}

export async function getAdminByEmail(email: string): Promise<AdminUser | undefined> {
  const admins = await listAdmins();
  return admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export async function updateAdminPassword(id: string, passwordHash: string): Promise<AdminUser | undefined> {
  const admins = await listAdmins();
  const index = admins.findIndex((a) => a.id === id);
  if (index === -1) return undefined;
  admins[index] = { ...admins[index], passwordHash, updatedAt: new Date().toISOString() };
  await writeJson(FILE, admins);
  return admins[index];
}
