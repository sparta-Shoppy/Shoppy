import { ProductType } from '@/types/product-type';
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './fiebaseApi';
import { UpdateCartProps } from '@/types/cart-type';

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

export async function createCartData(item: ProductType, userId: string): Promise<void> {
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

export async function updateCartData({ userId, productId, quantity }: UpdateCartProps): Promise<void> {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);
  const products = cartSnap.data()?.products;

  const updateProducts = products.map((item: ProductType) => {
    if (item.productId === productId) {
      return { ...item, quantity: quantity };
    }
    return item;
  });

  await updateDoc(cartRef, { products: updateProducts });
}

export async function deleteCartData(productId: string, userId: string): Promise<void> {
  const cartRef = doc(db, 'carts', userId);
  const cartSnap = await getDoc(cartRef);
  const products = cartSnap.data()?.products;
  const productToRemove = products?.find((p: ProductType) => p.productId === productId);

  if (productToRemove) {
    await updateDoc(cartRef, { products: arrayRemove(productToRemove) });
  }
}
