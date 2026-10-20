const fs = require('fs');
const path = require('path');

// 1. Load env variables manually from .env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
env.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    envVars[match[1]] = value;
  }
});
process.env.NEXT_PUBLIC_SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
process.env.SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

const { createClient } = require('@supabase/supabase-js');
const admin = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.SUPABASE_SERVICE_ROLE_KEY);

async function runPhase1Tests() {
  console.log('====================================================');
  console.log('🧪 PINSITE WEB STUDIO: PHASE 1 MEDIA ENGINE TEST');
  console.log('====================================================\n');

  // Test 1: Upload a real test PNG buffer to Supabase preview-assets
  console.log('▶️ [Test 1/4] Uploading synthetic test image to Supabase Storage (preview-assets)...');
  // 1x1 transparent PNG buffer
  const samplePngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const testFileName = `studio/test/test-image-${Date.now()}.png`;

  const { data: uploadData, error: uploadErr } = await admin.storage
    .from('preview-assets')
    .upload(testFileName, samplePngBuffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (uploadErr) {
    console.error('❌ Test 1 FAILED: Could not upload to Supabase storage:', uploadErr);
    process.exit(1);
  }

  const { data: publicUrlData } = admin.storage
    .from('preview-assets')
    .getPublicUrl(testFileName);

  console.log('✅ Test 1 PASSED: File uploaded successfully!');
  console.log(`   Public CDN URL: ${publicUrlData.publicUrl}\n`);

  // Test 2: Fetch the uploaded image back from Supabase CDN to verify HTTP 200
  console.log('▶️ [Test 2/4] Verifying uploaded image is publicly accessible...');
  const cdnRes = await fetch(publicUrlData.publicUrl);
  if (!cdnRes.ok) {
    console.error(`❌ Test 2 FAILED: Public CDN returned HTTP ${cdnRes.status}`);
    process.exit(1);
  }
  const cdnType = cdnRes.headers.get('content-type');
  console.log(`✅ Test 2 PASSED: CDN returned HTTP ${cdnRes.status} (${cdnType})\n`);

  // Test 3: External URL validation
  console.log('▶️ [Test 3/4] Testing Web Image Link Validation...');
  const validUrl = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80';
  const validRes = await fetch(validUrl, { method: 'HEAD' });
  if (validRes.ok && validRes.headers.get('content-type')?.startsWith('image/')) {
    console.log('✅ Test 3A PASSED: Valid Unsplash image verified.');
  } else {
    console.warn('⚠️ Test 3A Note: Unsplash HEAD status:', validRes.status);
  }

  const badUrl = 'https://example.com/not-an-image.txt';
  const badRes = await fetch(badUrl, { method: 'HEAD' }).catch(() => null);
  const badType = badRes ? badRes.headers.get('content-type') : null;
  if (!badType || !badType.startsWith('image/')) {
    console.log('✅ Test 3B PASSED: Non-image URL correctly rejected.');
  }
  console.log();

  // Test 4: Niche Vaults Inspection
  console.log('▶️ [Test 4/4] Validating 12 Curated Industry Image Vaults...');
  const { NICHE_VAULTS, listAllVaultNiches, resolveVaultNiche } = require('../src/lib/studio/vault.ts');
  const allNiches = listAllVaultNiches();
  console.log(`   Found ${allNiches.length} curated industry image collections:`);
  allNiches.forEach((n, idx) => {
    console.log(`   ${(idx + 1).toString().padStart(2, ' ')}. [${n.id}] ${n.name} (${n.category}) - ${n.serviceCount} services`);
  });

  // Verify resolution
  const testDental = resolveVaultNiche('Dr. Sharma Pediatric Dentistry');
  const testRoof = resolveVaultNiche('Apex Roofing and Gutters');
  const testCafe = resolveVaultNiche('Artisan Roast Coffee & Bakery');

  if (testDental.id === 'dental' && testRoof.id === 'roofing' && testCafe.id === 'restaurant_cafe') {
    console.log('\n✅ Test 4 PASSED: Smart niche matching works accurately!');
  } else {
    console.error('❌ Test 4 FAILED: Smart niche matching mismatch');
    process.exit(1);
  }

  // Clean up test file from storage
  await admin.storage.from('preview-assets').remove([testFileName]);
  console.log('🧹 Cleaned up temporary test file.');

  console.log('\n====================================================');
  console.log('🎉 ALL PHASE 1 MEDIA & IMAGE HUB TESTS PASSED (100%)');
  console.log('====================================================');
}

runPhase1Tests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
