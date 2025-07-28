import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Lazy load Auth service
export const getFirebaseAuth = () => {
  if (typeof window === "undefined") return null;
  
  try {
    const auth = getAuth(app);
    
    // Development emulator
    if (process.env.NODE_ENV === "development") {
      try {
        connectAuthEmulator(auth, "http://localhost:9099");
      } catch (error) {
        // Already connected
      }
    }
    
    return auth;
  } catch (error) {
    console.error("Failed to initialize Firebase Auth:", error);
    return null;
  }
};

// Lazy load Firestore service
export const getFirebaseFirestore = () => {
  if (typeof window === "undefined") return null;
  
  try {
    const db = getFirestore(app);
    
    // Development emulator
    if (process.env.NODE_ENV === "development") {
      try {
        connectFirestoreEmulator(db, "localhost", 8080);
      } catch (error) {
        // Already connected
      }
    }
    
    return db;
  } catch (error) {
    console.error("Failed to initialize Firebase Firestore:", error);
    return null;
  }
};

// Utility functions for common Firebase operations
export const firebaseUtils = {
  // Check if Firebase is properly configured
  isConfigured: () => {
    return !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
  },

  // Get current user
  getCurrentUser: () => {
    const auth = getFirebaseAuth();
    return auth?.currentUser || null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const auth = getFirebaseAuth();
    return !!auth?.currentUser;
  },
}; 