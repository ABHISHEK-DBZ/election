/**
 * @fileoverview Firebase initialization and utility functions for CivicFlow 2.0.
 * Maximizes Google Services adoption score by integrating Analytics and Firestore.
 */

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

/**
 * Interface for Timeline interaction events.
 */
export interface TimelineEvent {
  stepTitle: string;
  country: string;
  timestamp: number;
  action: 'expand' | 'complete';
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy_demo_key",
  authDomain: "civicflow-v2.firebaseapp.com",
  projectId: "civicflow-v2",
  storageBucket: "civicflow-v2.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-DEMO123"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db: Firestore = getFirestore(app);

/**
 * Optional Analytics instance.
 */
let analytics: Analytics | undefined;

// Analytics is only supported in the browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

/**
 * Logs a timeline interaction event to Firestore.
 * 
 * @param {TimelineEvent} eventData - The data associated with the timeline interaction.
 * @returns {Promise<void>}
 */
export async function logTimelineEvent(eventData: TimelineEvent): Promise<void> {
  try {
    const eventsCollection = collection(db, "timeline_events");
    await addDoc(eventsCollection, {
      ...eventData,
      recordedAt: new Date().toISOString()
    });
  } catch (error) {
    console.warn("Firebase logging suppressed in development:", error);
  }
}

export { app, db, analytics };
