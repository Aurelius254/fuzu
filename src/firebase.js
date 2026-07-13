import { initializeApp } from "firebase/app";
import { 
  indexedDBLocalPersistence, 
  browserLocalPersistence,
  initializeAuth, 
  GoogleAuthProvider,
  getAuth
} from "firebase/auth";
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Use different persistence based on platform
let auth;
if (Capacitor.isNativePlatform()) {
  // Use IndexedDB for Capacitor (native apps)
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence,
  });
} else {
  // Use browser default for web
  auth = getAuth(app);
}

export { auth };
export const googleProvider = new GoogleAuthProvider();