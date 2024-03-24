'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import ProductItems from '@/components/products/ProductItems';
import { useGetProducts } from '@/utill/hooks/products/products';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Tabs from '../main/Tabs';

export default function Product() {
  const [selectedTab, setSelectedTab] = useState(true);

  const params = useSearchParams();
  const category = params.get('category');
  // params - / 기준으로 전달
  // useSearchParams - ? 기준으로 전달

  const { data, isLoading, isError, refetch } = useGetProducts(selectedTab, category!);

  useEffect(() => {
    refetch();
  }, [selectedTab, refetch, category]);

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
      <Tabs />
      <div className="w-11/12 flex justify-end">
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
