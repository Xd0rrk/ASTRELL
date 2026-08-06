import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local BEFORE importing Firebase
config({ path: resolve(process.cwd(), '.env.local') });

async function testFirebase() {
  const { 
    getMediaAsset, 
    getActiveShowcaseItems, 
    logConsent, 
    getPublishedGalleryItems 
  } = await import('../lib/firebase-collections');
  const { getFirestoreDb } = await import('../lib/firebase');
  const { collection, getDocs, query, limit } = await import('firebase/firestore');

  console.log('Testing Firebase Connection & Client Library...\n');

  try {
    // 1. Check if DB is initialized
    const db = getFirestoreDb();
    if (!db) {
      console.error('❌ Firebase DB failed to initialize. Check environment variables.');
      process.exit(1);
    }
    console.log('✅ Firebase initialized successfully.');

    // 2. Test reading active showcase items (Public read allowed)
    console.log('\nFetching Active Showcase Items...');
    const showcaseItems = await getActiveShowcaseItems();
    console.log(`✅ Found ${showcaseItems.length} active showcase items.`);
    if (showcaseItems.length > 0) {
      console.log('Sample item:', showcaseItems[0].title);
    }

    // 3. Test reading published gallery items
    console.log('\nFetching Published Gallery Items...');
    const galleryItems = await getPublishedGalleryItems();
    console.log(`✅ Found ${galleryItems.length} published gallery items.`);

    // 4. Test anonymous write to consent_logs (Anonymous create allowed)
    console.log('\nTesting anonymous write to consent_logs...');
    await logConsent({ necessary: true, analytics: false, functional: true }, 'test-version');
    console.log('✅ Successfully wrote to consent_logs (anonymous write test).');

    // 5. Test reading from a protected collection (should fail without auth)
    console.log('\nTesting read on protected collection (should fail gracefully or return empty/error)...');
    try {
      const q = query(collection(db, 'consent_logs'), limit(1));
      await getDocs(q);
      console.log('⚠️ Expected an error or no access, but read succeeded? Check security rules.');
    } catch (error: any) {
      console.log('✅ Read correctly denied on consent_logs:', error.message);
    }

    console.log('\n🎉 All client library tests completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Test failed with error:', error);
    process.exit(1);
  }
}

testFirebase();
