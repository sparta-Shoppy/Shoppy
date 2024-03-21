'use client';
import { db } from '@/api/fiebaseApi';
import ProductItems from '@/components/ProductItems';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { ProductType } from '@/types/product-type';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedTab, setSelectedTab] = useState(true);

  const params = useSearchParams();
  const category = params.get('category');
  // params - / 기준으로 전달
  // useSearchParams - ? 기준으로 전달

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'product'),
            where('category', '==', category),
            selectedTab ? orderBy('price', 'desc') : orderBy('price', 'asc')
          )
        );
        const fetchedProducts: any[] = [];

        querySnapshot.forEach((doc) => {
          const products = doc.data();

          fetchedProducts.push({ ...products, id: doc.id, products });
        });

        setProducts(fetchedProducts);
      } catch (error) {
        console.log('상품 데이터 가져오기 실패', error);
      }
    };

    fetchProductsData();
  }, [selectedTab]);

  return (
    <div>
      <Header />
      <SearchProduct />
      <div className="w-11/12 flex justify-end ">
        <span
          className={`cursor-pointer mr-2 ${selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
          onClick={() => setSelectedTab(true)}
        >
          높은 가격순
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${!selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
          onClick={() => setSelectedTab(false)}
        >
          낮은 가격순
        </span>
      </div>
      <div className="m-auto w-full flex flex-wrap justify-center">
        {products?.map((item) => {
          return <ProductItems key={item.productId} item={item} />;
        })}
      </div>
    </div>
  );
}
