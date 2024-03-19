// Import the functions you need from the SDKs you need
'use client';

import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

//지역변수로 사용하기
export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

try {
  app = getApp('app');
} catch (e) {
  app = initializeApp(firebaseConfig, 'app');
}

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebaseApp;
