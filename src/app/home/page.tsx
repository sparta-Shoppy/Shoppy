'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import MainProductItems from '@/components/main/MainProductItems';
import SlideShow from '@/components/main/SlideShow';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { TbMeat } from 'react-icons/tb';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState(true);
  // const [products, setProducts] = useState<ProductType[]>([]);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['mainProductData'],
    queryFn: async () => {
      const response = await getDocs(
        selectedTab
          ? query(collection(db, 'product'), orderBy('createdAt', 'desc'))
          : query(collection(db, 'product'), orderBy('createdAt', 'asc'))
      );
      const fetchedProducts: any = [];

      response?.forEach((doc: any) => {
        const products = doc.data();
        fetchedProducts.push({ ...products, id: doc.id, products });
      });

      return fetchedProducts;
    }
  });

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
      <div className="flex justify-evenly w-4/5 p-10 m-auto text-xl pt-36">
        <Link href={'/products?category=과일/채소'} className="main__tabs-field">
          <GiFruitBowl /> 과일/채소
        </Link>
        <Link href={'/products?category=고기'} className="main__tabs-field">
          <TbMeat /> 고기
        </Link>
        <Link href={'/products?category=가공식품'} className="main__tabs-field">
          <GiHamburger /> 가공식품
        </Link>
        <Link href={'/products?category=해산물'} className="main__tabs-field">
          <IoFishOutline /> 해산물
        </Link>
      </div>
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

      <div className="flex justify-center">
        <button className="w-28 p-1 border rounded-md bg-slate-200 hover:bg-white">MORE</button>
      </div>
    </div>
  );
}
