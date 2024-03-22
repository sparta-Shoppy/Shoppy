import { ProductType } from '@/types/product-type';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './fiebaseApi';

export async function readCartData(userId: string): Promise<ProductType[]> {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    if (cartData.products && Array.isArray(cartData.products)) {
      return cartData.products as ProductType[];
    }
  }
  return [];
}
