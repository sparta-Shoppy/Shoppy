'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { stringTransform } from '@/utill/hooks/transform';
import MainProductItems from '@/components/main/MainProductItems';
import { ProductType } from '@/types/product-type';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { TbMeat } from 'react-icons/tb';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(
          selectedTab
            ? query(collection(db, 'product'), orderBy('createdAt', 'desc'))
            : query(collection(db, 'product'), orderBy('createdAt', 'asc'))
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
    <div className="h-screen ">
      <Header />
      <SearchProduct />
      <div className="carousel w-full h-80  overflow-hidden relative">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="assets/main1.PNG" className="w-full h-80" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide4"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="assets/main2.PNG" className="w-full h-80" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide1"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="assets/main3.PNG" className="w-full h-80" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide2"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="assets/main4.PNG" className="w-full h-80" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide3"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle bg-opacity-35 bg-white rounded-full p-3 hover:scale-125 transition-transform"
            >
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly w-4/5 p-10 m-auto text-xl">
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
        {products?.map((item) => {
          return <MainProductItems key={item.productId} item={item} />;
        })}
      </div>

      <div className="flex justify-center">
        <button className="w-28 p-1 border rounded-md bg-slate-200 hover:bg-white">MORE</button>
      </div>
    </div>
  );
}
