'use client';
import Header from '@/components/common/Header';
import MainProductItems from '@/components/main/MainProductItems';
import SlideShow from '@/components/main/SlideShow';
import Tabs from '@/components/main/Tabs';
import { useGetMainProducts } from '@/utill/hooks/products/products';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState(true);

  const { data, isLoading, isError, refetch } = useGetMainProducts(selectedTab);

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
  const images = [
    'https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/main1.PNG?raw=true',
    'https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/main2.PNG?raw=true',
    'https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/main3.PNG?raw=true',
    'https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/main4.PNG?raw=true'
  ];
  return (
    <div className="h-screen ">
      <Header />
      <SlideShow images={images} />

      <Tabs />
      <div className="w-4/5 flex justify-end mb-5">
        <span
          className={`cursor-pointer mr-2 ${selectedTab ? 'text-cyan-400' : 'text-black hover:text-cyan-400'}`}
          onClick={() => setSelectedTab(true)}
        >
          신상품
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${!selectedTab ? 'text-pink-300' : 'text-black hover:text-pink-300'}`}
          onClick={() => setSelectedTab(false)}
        >
          베스트
        </span>
      </div>
      <div className="flex justify-center w-4/5 m-auto gap-20 flex-wrap">
        {data?.map((item: any) => {
          return <MainProductItems key={item.productId} item={item} />;
        })}
      </div>
    </div>
  );
}
