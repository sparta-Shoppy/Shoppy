// Import the functions you need from the SDKs you need

import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//지역변수로 사용하기
export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: 'AIzaSyApzJmIoQIh6CHvVxlJQkIvdJCuv2L_R7c',
  authDomain: 'gabaedo-7fda6.firebaseapp.com',
  databaseURL: 'https://gabaedo-7fda6-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gabaedo-7fda6',
  storageBucket: 'gabaedo-7fda6.appspot.com',
  messagingSenderId: '816387183671',
  appId: '1:816387183671:web:cfe441af3943655e7a9bb2'
};

try {
  app = getApp('app');
} catch (e) {
  app = initializeApp(firebaseConfig, 'app');
}

export const database = getDatabase(app);

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);

export default firebaseApp;
