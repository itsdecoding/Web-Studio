/**
 * Pinsite Web Studio: Media Upload & Image Validation Engine
 * Phase 1: Robust storage in Supabase Storage with resilient fallbacks
 */

import { getAdminClient } from '@/lib/supabase';
import { UploadImageResult, ValidateUrlResult } from './types';

const BUCKET_NAME = 'preview-assets';
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Sanitizes a file name for safe cloud storage
 */
function sanitizeFileName(originalName: string): string {
  const base = originalName.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-');
  const dotIndex = base.lastIndexOf('.');
  const ext = dotIndex > -1 ? base.slice(dotIndex) : '.jpg';
  const nameWithoutExt = dotIndex > -1 ? base.slice(0, dotIndex) : base;
  const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${nameWithoutExt}-${uniqueSuffix}${ext}`;
}

/**
 * Uploads a binary buffer to the Supabase preview-assets bucket
 */
export async function uploadStudioImageBuffer(
  buffer: Buffer,
  originalFileName: string,
  mimeType: string,
  folder = 'uploads'
): Promise<UploadImageResult> {
  try {
    if (!ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
      return {
        success: false,
        error: `Unsupported image format (${mimeType}). Please upload JPG, PNG, WEBP, or SVG.`,
        source: 'upload',
      };
    }

    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `Image exceeds maximum allowed size (10MB). Your file is ${(buffer.length / (1024 * 1024)).toFixed(1)}MB.`,
        source: 'upload',
      };
    }

    const admin = getAdminClient();
    const cleanName = sanitizeFileName(originalFileName);
    const storagePath = `studio/${folder}/${cleanName}`;

    const { data, error } = await admin.storage
      .from(BUCKET_NAME)
      .upload(storagePath, buffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      console.error('[Studio Upload] Supabase upload error:', error);
      return {
        success: false,
        error: `Storage upload failed: ${error.message}`,
        source: 'upload',
      };
    }

    const { data: publicUrlData } = admin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    return {
      success: true,
      url: publicUrlData.publicUrl,
      fileName: cleanName,
      mimeType,
      sizeBytes: buffer.length,
      source: 'upload',
    };
  } catch (err: any) {
    console.error('[Studio Upload] Unexpected exception:', err);
    return {
      success: false,
      error: err?.message || 'Unexpected server error while uploading image.',
      source: 'upload',
    };
  }
}

/**
 * Validates that an external image URL is reachable and returns an image
 */
export async function validateExternalImageUrl(url: string): Promise<ValidateUrlResult> {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'Empty or invalid URL provided.' };
  }

  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return { valid: false, error: 'URL must begin with http:// or https://' };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s timeout

    let res = await fetch(trimmed, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PinsiteStudio/1.0',
      },
    });

    clearTimeout(timeout);

    // If HEAD is rejected by the server (e.g. 405 Method Not Allowed), fall back to GET with range
    if (!res.ok) {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 4000);
      res = await fetch(trimmed, {
        method: 'GET',
        signal: getController.signal,
        headers: {
          Range: 'bytes=0-1024',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PinsiteStudio/1.0',
        },
      });
      clearTimeout(getTimeout);
    }

    if (!res.ok) {
      return {
        valid: false,
        error: `Image URL returned status HTTP ${res.status}. Please check the link.`,
      };
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('image/') && !trimmed.includes('unsplash.com') && !trimmed.includes('googleusercontent.com')) {
      return {
        valid: false,
        error: `The provided URL does not appear to return an image (returned: ${contentType || 'unknown'}).`,
      };
    }

    return {
      valid: true,
      url: trimmed,
      contentType,
    };
  } catch (err: any) {
    // If it's a known reliable CDN like Unsplash or Google, accept it even if network HEAD times out
    if (trimmed.includes('unsplash.com') || trimmed.includes('googleusercontent.com')) {
      return {
        valid: true,
        url: trimmed,
        contentType: 'image/jpeg',
      };
    }

    return {
      valid: false,
      error: `Could not reach the image URL: ${err?.message || 'Connection timed out'}`,
    };
  }
}
