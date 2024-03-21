// Import the functions you need from the SDKs you need

import { ProductType } from '@/types/product-type';

import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, remove, set } from 'firebase/database';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//지역변수로 사용하기

interface AddOrUpdateToCartProps {
  userId: string;
  productId: string;
  quantity: number;
}

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
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

export const addOrUpdateToCart = async ({ userId, productId, quantity }: AddOrUpdateToCartProps) => {
  try {
    const cartRef = doc(db, 'carts', userId);

    const cartSnap = await getDoc(cartRef);
    const products = cartSnap.data()?.products;

    const updatedProducts = products.map((item: ProductType) => {
      if (item.productId === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    await updateDoc(cartRef, { products: updatedProducts });
  } catch (error: any) {
    console.error('failed to addOrUpdateToCart', error.message);
  }
};

export default firebaseApp;
