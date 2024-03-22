import { ProductType } from '@/types/product-type';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './fiebaseApi';
import { CartType } from '@/types/cart-type';
import { userId } from './user';

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

export async function createCartData(item: CartType, userId: string): Promise<void> {
  //void로 해준 이유는 생성만 하고 별도의 값을 반환하지 않기 때문
  const cartRef = doc(db, 'carts', userId);
  const cartSnapshot = await getDoc(cartRef);

  //카드에 유저아이디 문서가 있으면 item만 추가
  if (cartSnapshot.exists()) {
    await updateDoc(cartRef, {
      products: arrayUnion(item)
    });

    //카드에 유저아이디가 없으면 cart 생성 및 추가
  } else {
    await setDoc(cartRef, {
      products: [item]
    });
  }
}
