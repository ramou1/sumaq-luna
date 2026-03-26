"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

function readFirebaseConfig() {
  // IMPORTANT: em `use client`, envs `NEXT_PUBLIC_*` são injetadas no bundle, mas
  // para evitar crash no build/prerender, retornamos `null` se não houver config.
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

  if (
    !apiKey ||
    !authDomain ||
    !projectId ||
    !storageBucket ||
    !messagingSenderId ||
    !appId
  ) {
    return null;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };
}

export function getFirebaseAuthDb() {
  if (auth && db) {
    return { auth, db };
  }

  const config = readFirebaseConfig();
  if (!config) {
    throw new Error(
      "Faltan variáveis de ambiente NEXT_PUBLIC_FIREBASE_* (no .env.local ou nas Environment Variables da Vercel)."
    );
  }

  const existing = getApps();
  app = existing.length > 0 ? existing[0] : initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);

  return { auth, db };
}

