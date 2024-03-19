// Import the functions you need from the SDKs you need

import { ProductType } from '@/types/product-type';
import exp from 'constants';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getDatabase, get, ref, remove, set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//지역변수로 사용하기

interface AddOrUpdateToCartProps {
  userId: string;
  productId: string;
  product: ProductType;
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

//카트정보 읽어오기
export const getCart = async (userId: string) => {
  try {
    const getUserCart = await get(ref(database, `carts/${userId}`));
    const items = getUserCart.val() || {};
    return Object.values(items);
  } catch (error: any) {
    console.log('failed to fetch getCart', error.code);
  }
};

//카트 추가
export const addOrUpdateToCart = async ({ userId, productId, product }: AddOrUpdateToCartProps) => {
  try {
    await set(ref(database, `carts/${userId}/${productId}`), product);
  } catch (error: any) {
    console.log('faild to update addOrUpdateToCart', error.code);
  }
};

//카트삭제
export const removeCart = async (userId: string, productId: string) => {
  remove(ref(database, `carts/${userId}/${productId}`));
};

export default firebaseApp;
