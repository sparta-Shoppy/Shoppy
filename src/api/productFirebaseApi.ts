import { ProductType } from '@/types/product-type';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './fiebaseApi';

export async function getMainProducts(selectedTab: boolean) {
  const response = await getDocs(
    selectedTab
      ? query(collection(db, 'product'), orderBy('createdAt', 'desc'))
      : query(collection(db, 'product'), orderBy('createdAt', 'asc'))
  );

  const fetchedProducts: ProductType[] = [];
  response?.forEach((doc) => {
    const products = doc.data() as ProductType;
    fetchedProducts.push({ ...products });
  });

  return fetchedProducts;
}

export async function getProducts(selectedTab: boolean, category: string) {
  const response = await getDocs(
    query(
      collection(db, 'product'),
      where('category', '==', category),
      selectedTab ? orderBy('price', 'desc') : orderBy('price', 'asc')
    )
  );
  const fetchedProducts: ProductType[] = [];
  response?.forEach((doc) => {
    const product = doc.data() as ProductType;
    fetchedProducts.push({ ...product });
  });

  return fetchedProducts;
}
