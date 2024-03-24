'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import ProductItems from '@/components/products/ProductItems';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Product() {
  // const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedTab, setSelectedTab] = useState(true);

  const params = useSearchParams();
  const category = params.get('category');

  // params - / 기준으로 전달
  // useSearchParams - ? 기준으로 전달

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['productData'],
    queryFn: async () => {
      const response = await getDocs(
        query(
          collection(db, 'product'),
          where('category', '==', category),
          selectedTab ? orderBy('price', 'desc') : orderBy('price', 'asc')
        )
      );
      const fetchedProducts: any = [];

      response?.forEach((doc: any) => {
        const products = doc.data();
        console.log('products', products);

        fetchedProducts.push({ ...products, id: doc.id, products });
      });
      return fetchedProducts;
    }
  });
  console.log('data', data);

  useEffect(() => {
    refetch();
  }, [selectedTab, refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div>잠시만 기다려 주세요</div>
        <img src="../../../assets/bean.gif" alt="로딩중" />
      </div>
    );
  }

  if (isError) {
    toast.error('데이터를 가져올 수 없습니다');
  }

  return (
    <div>
      <Header />
      <div className="w-11/12 flex justify-end pt-24">
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
        {data?.map((item: any) => {
          return <ProductItems key={item.productId} item={item} />;
        })}
      </div>
    </div>
  );
}