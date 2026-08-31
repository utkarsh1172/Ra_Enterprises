// One-time migration: push local JSON product/category data into Firestore.
// Run with: node -r dotenv/config scripts/migrate-to-firestore.mjs dotenv_config_path=.env.local
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';
import path from 'path';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Missing Firebase admin credentials in environment.');
}

initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore();

async function migrateCollection(fileName, collectionName) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'db', fileName);
  const raw = await readFile(filePath, 'utf-8');
  const items = JSON.parse(raw);

  const batch = db.batch();
  for (const item of items) {
    batch.set(db.collection(collectionName).doc(item.id), item);
  }
  await batch.commit();
  console.log(`Migrated ${items.length} documents into "${collectionName}"`);
}

await migrateCollection('categories.json', 'categories');
await migrateCollection('products.json', 'products');

console.log('Migration complete.');
