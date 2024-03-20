'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { stringTransform } from '@/hooks/transform';
import { ProductType } from '@/types/product-type';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline, IoHeartSharp } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { TbMeat } from 'react-icons/tb';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('신상품');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'product'));
        const fetchedProducts: any = [];

        querySnapshot.forEach((doc) => {
          const products = doc.data();
          fetchedProducts.push({ ...products, id: doc.id, products });
        });
        if (fetchedProducts.length != null) {
        }

        // 등록일 기준, 가격 기준으로 정렬
        const sortedProducts =
          selectedTab === '신상품'
            ? fetchedProducts.sort(
                (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
            : fetchedProducts.sort((a: any, b: any) => b.price - a.price);

        setProducts(sortedProducts);
      } catch (error) {
        console.log('상품 데이터 가져오기 실패', error);
      }
    };

    fetchProductsData();
  }, [selectedTab]);

  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <div className="h-screen">
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
          className={`cursor-pointer mr-2 ${
            selectedTab === '신상품' ? 'text-cyan-400' : 'text-black hover:text-cyan-400'
          }`}
          onClick={() => setSelectedTab('신상품')}
        >
          신상품
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${
            selectedTab === '베스트' ? 'text-pink-300' : 'text-black hover:text-pink-300'
          }`}
          onClick={() => setSelectedTab('베스트')}
        >
          베스트
        </span>
      </div>
      <div className="flex justify-center w-4/5 m-auto gap-20 flex-wrap">
        {products?.map((item) => {
          return (
            <div
              key={item.productId}
              className="w-1/4 h-96 flex flex-wrap justify-center cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300 pb-5"
            >
              <img src={item.image} alt="상품" className="w-full h-4/5 object-cover rounded-tl-md rounded-tr-md" />
              <div className="flex justify-between p-3">
                <div>
                  <p>{item.title}</p>
                  <p>{stringTransform(item.price)}</p>
                </div>
                <div className="flex justify-end gap-2 items-center pl-5">
                  {heart ? (
                    <IoHeartSharp onClick={handleHeart} className="text-3xl text-rose-500 cursor-pointer" />
                  ) : (
                    <IoHeartSharp onClick={handleHeart} className="text-3xl hover:text-rose-500 cursor-pointer" />
                  )}
                  <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button className="w-28 p-1 border rounded-md bg-slate-200 hover:bg-white">MORE</button>
      </div>
    </div>
  );
}
