/**
 * Migration script to import existing translations.js data to Firebase Firestore
 * 
 * Usage:
 * 1. Make sure Firebase is configured in src/config/firebase.js
 * 2. Run: node scripts/import-data.js
 * 
 * This script will:
 * - Import translations for both 'tr' and 'en' languages
 * - Import product configurations
 * - Import statistics
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { translations } from '../src/data/translations.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase configuration - should match your .env file
// For Node.js scripts, you can either:
// 1. Use dotenv package: npm install dotenv and uncomment the lines below
// 2. Or manually set these values here

// Option 1: Using dotenv (recommended)
// import dotenv from 'dotenv';
// dotenv.config();

// Option 2: Manual configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'AIzaSyDDOGZ0nVpNLcCNZ9b7nEVVVnpoAMlh3lk',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'tomiris-19336.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'tomiris-19336',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'tomiris-19336.firebasestorage.app',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1007774345602',
  appId: process.env.VITE_FIREBASE_APP_ID || '1:1007774345602:web:28159da6b1f3e5584b879b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importData() {
  try {
    console.log('Starting data import...\n');

    // Import translations for Turkish
    if (translations.tr) {
      console.log('Importing Turkish translations...');
      await setDoc(doc(db, 'translations', 'tr'), {
        ...translations.tr,
        lastUpdated: new Date().toISOString(),
        importedAt: new Date().toISOString(),
      });
      console.log('✓ Turkish translations imported\n');
    }

    // Import translations for English
    if (translations.en) {
      console.log('Importing English translations...');
      await setDoc(doc(db, 'translations', 'en'), {
        ...translations.en,
        lastUpdated: new Date().toISOString(),
        importedAt: new Date().toISOString(),
      });
      console.log('✓ English translations imported\n');
    }

    // Import product configurations (from ProductGrid component)
    const products = [
      { key: 'traffic', href: '/products/traffic', gradient: 'from-blue-500 to-blue-700', popular: true },
      { key: 'kasko', href: '/products/kasko', gradient: 'from-emerald-500 to-emerald-700', popular: true },
      { key: 'health', href: '/products/health', gradient: 'from-red-500 to-red-700', popular: false },
      { key: 'travel', href: '/products/travel', gradient: 'from-purple-500 to-purple-700', popular: false },
      { key: 'dask', href: '/products/dask', gradient: 'from-orange-500 to-orange-700', popular: false },
      { key: 'home', href: '/products/home', gradient: 'from-yellow-500 to-yellow-700', popular: false },
      { key: 'pet', href: '/products/pet', gradient: 'from-pink-500 to-pink-700', isNew: true },
      { key: 'phone', href: '/products/phone', gradient: 'from-cyan-500 to-cyan-700', popular: false },
    ];

    console.log('Importing product configurations...');
    await setDoc(doc(db, 'config', 'products'), {
      items: products,
      lastUpdated: new Date().toISOString(),
      importedAt: new Date().toISOString(),
    });
    console.log('✓ Products imported\n');

    // Import statistics
    const statistics = {
      customers: 'X.XM',
      policies: 'XX.XM',
      partners: 'XX',
      experience: 'XX',
    };

    console.log('Importing statistics...');
    await setDoc(doc(db, 'config', 'statistics'), {
      ...statistics,
      lastUpdated: new Date().toISOString(),
      importedAt: new Date().toISOString(),
    });
    console.log('✓ Statistics imported\n');

    console.log('✅ All data imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify the data in Firebase Console');
    console.log('2. Set up Firestore security rules');
    console.log('3. Create admin user in Firebase Authentication');
    console.log('4. Test the admin dashboard');
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData().then(() => {
  console.log('\nImport complete!');
  process.exit(0);
});

