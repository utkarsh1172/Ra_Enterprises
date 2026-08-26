// ============================================================
// Generic JSON file read/write helper for the repository layer.
// Server-only. Never import this from a 'use client' module.
// ============================================================

import fs from 'fs/promises';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'src', 'data', 'db');

export async function readJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(DB_DIR, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  const filePath = path.join(DB_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}
