/**
 * Pinsite Web Studio: API Key Management & Storage
 * Persists keys securely in Supabase Storage with SHA-256 hashing.
 */

import crypto from 'crypto';
import { getAdminClient } from '@/lib/supabase';

export interface StudioApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  keyHash: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string | null;
  usageCount: number;
  status: 'active' | 'revoked';
}

export interface PublicStudioApiKey {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsedAt: string | null;
  usageCount: number;
  status: 'active' | 'revoked';
}

const BUCKET = 'preview-assets';
const KEYS_PATH = 'studio/system/api_keys.json';

function hashKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

async function loadAllKeys(): Promise<StudioApiKeyRecord[]> {
  try {
    const admin = getAdminClient();
    const { data, error } = await admin.storage.from(BUCKET).download(KEYS_PATH);
    if (error || !data) {
      return [];
    }
    const text = await data.text();
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveAllKeys(keys: StudioApiKeyRecord[]): Promise<boolean> {
  try {
    const admin = getAdminClient();
    const content = Buffer.from(JSON.stringify(keys, null, 2), 'utf-8');
    const { error } = await admin.storage.from(BUCKET).upload(KEYS_PATH, content, {
      contentType: 'application/json',
      upsert: true,
    });
    if (error) {
      console.error('[Studio Keys] Save keys error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Studio Keys] Save keys exception:', err);
    return false;
  }
}

export async function listApiKeys(): Promise<PublicStudioApiKey[]> {
  const keys = await loadAllKeys();
  return keys.map((k) => ({
    id: k.id,
    name: k.name,
    maskedKey: k.maskedKey,
    createdAt: k.createdAt,
    lastUsedAt: k.lastUsedAt,
    usageCount: k.usageCount || 0,
    status: k.status,
  }));
}

export async function createApiKey(name: string): Promise<{ rawKey: string; key: PublicStudioApiKey }> {
  const cleanName = name?.trim() || 'Default Integration Key';
  const randomSuffix = crypto.randomBytes(18).toString('hex'); // 36 hex chars
  const rawKey = `pks_live_${randomSuffix}`;
  const keyHash = hashKey(rawKey);
  const id = `key_${crypto.randomBytes(6).toString('hex')}`;
  const maskedKey = `pks_live_${randomSuffix.slice(0, 4)}••••••••${randomSuffix.slice(-4)}`;
  const now = new Date().toISOString();

  const record: StudioApiKeyRecord = {
    id,
    name: cleanName,
    prefix: `pks_live_${randomSuffix.slice(0, 4)}`,
    keyHash,
    maskedKey,
    createdAt: now,
    lastUsedAt: null,
    usageCount: 0,
    status: 'active',
  };

  const existing = await loadAllKeys();
  existing.unshift(record);
  await saveAllKeys(existing);

  return {
    rawKey,
    key: {
      id: record.id,
      name: record.name,
      maskedKey: record.maskedKey,
      createdAt: record.createdAt,
      lastUsedAt: record.lastUsedAt,
      usageCount: record.usageCount,
      status: record.status,
    },
  };
}

export async function revokeApiKey(keyId: string): Promise<boolean> {
  const keys = await loadAllKeys();
  const index = keys.findIndex((k) => k.id === keyId);
  if (index === -1) return false;

  keys[index].status = 'revoked';
  return await saveAllKeys(keys);
}

export async function deleteApiKey(keyId: string): Promise<boolean> {
  const keys = await loadAllKeys();
  const filtered = keys.filter((k) => k.id !== keyId);
  return await saveAllKeys(filtered);
}

export async function validateApiKey(rawKey: string): Promise<{ valid: boolean; keyId?: string; name?: string }> {
  if (!rawKey || !rawKey.startsWith('pks_live_')) {
    return { valid: false };
  }

  const hash = hashKey(rawKey.trim());
  const keys = await loadAllKeys();
  const match = keys.find((k) => k.keyHash === hash && k.status === 'active');

  if (!match) {
    return { valid: false };
  }

  // Update last used timestamp and usage count in the background
  match.lastUsedAt = new Date().toISOString();
  match.usageCount = (match.usageCount || 0) + 1;
  saveAllKeys(keys).catch((err) => console.error('[Studio Keys] Background usage update error:', err));

  return {
    valid: true,
    keyId: match.id,
    name: match.name,
  };
}
