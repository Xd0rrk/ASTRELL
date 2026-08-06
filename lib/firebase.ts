/**
 * Firebase Client Initialization
 * 
 * Provides Firebase App, Firestore, and Storage instances for the ASTRELL project.
 * Gracefully no-ops when environment variables aren't configured (same pattern
 * as the original Supabase stub).
 *
 * Required env vars:
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

// ---------------------------------------------------------------------------
// Firebase Configuration (from environment variables)
// ---------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ---------------------------------------------------------------------------
// Configuration Check
// ---------------------------------------------------------------------------

/**
 * Returns true if the minimum required Firebase environment variables are set.
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

// ---------------------------------------------------------------------------
// Firebase App Singleton
// ---------------------------------------------------------------------------

let _app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

/**
 * Returns the Firebase App instance, initializing it if needed.
 * Returns null if Firebase is not configured.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    if (typeof window !== 'undefined') {
      console.info(
        '[Firebase] Not configured — set NEXT_PUBLIC_FIREBASE_* env vars to enable.'
      );
    }
    return null;
  }

  if (!_app) {
    _app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  return _app;
}

/**
 * Returns the Firestore database instance.
 * Returns null if Firebase is not configured.
 */
export function getFirestoreDb(): Firestore | null {
  if (_db) return _db;

  const app = getFirebaseApp();
  if (!app) return null;

  _db = getFirestore(app);
  return _db;
}

/**
 * Returns the Firebase Storage instance.
 * Returns null if Firebase is not configured.
 */
export function getFirebaseStorage(): FirebaseStorage | null {
  if (_storage) return _storage;

  const app = getFirebaseApp();
  if (!app) return null;

  _storage = getStorage(app);
  return _storage;
}
