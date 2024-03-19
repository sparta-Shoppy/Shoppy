'use client';

import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import Link from 'next/link';
import { useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';
import { TbMeat } from 'react-icons/tb';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('신상품');

  return (
    <div className="h-screen">
      <Header />
      <SearchProduct />
      <div className="carousel w-full h-80  overflow-hidden relative">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="assets/main1.PNG" className="w-full h-80" />
          <div className="main__slideImgWrapper">
            <a href="#slide4" className="main__slideButton">
              ❮
            </a>
            <a href="#slide2" className="main__slideButton">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="assets/main2.PNG" className="w-full h-80" />
          <div className="main__slideImgWrapper">
            <a href="#slide1" className="main__slideButton">
              ❮
            </a>
            <a href="#slide3" className="main__slideButton">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="assets/main3.PNG" className="w-full h-80" />
          <div className="main__slideImgWrapper">
            <a href="#slide2" className="main__slideButton">
              ❮
            </a>
            <a href="#slide4" className="main__slideButton">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="assets/main4.PNG" className="w-full h-80" />
          <div className="main__slideImgWrapper">
            <a href="#slide3" className="main__slideButton">
              ❮
            </a>
            <a href="#slide1" className="main__slideButton">
              ❯
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly w-4/5 p-10 m-auto text-xl">
        <Link href={'/products'} className="main__tabs-field">
          <GiFruitBowl /> 과일/채소
        </Link>
        <Link href={'/products'} className="main__tabs-field">
          <TbMeat /> 고기
        </Link>
        <Link href={'/products'} className="main__tabs-field">
          <GiHamburger /> 가공식품
        </Link>
        <Link href={'/products'} className="main__tabs-field">
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
      <div className="flex justify-center w-4/5 m-auto gap-20">
        <div className="w-1/5 h-96 cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300 pb-5">
          <img src="/assets/fast-food1.PNG" alt="가공식품" className="w-full h-4/5 object-cover rounded-md" />
          <div className="flex justify-between p-3">
            <div>
              <p>3,520원</p>
              <p>[저스트] 크림치즈 베이글 샌드</p>
            </div>
            <div className="flex justify-end gap-2 items-center pl-5">
              <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
              <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="w-28 p-1 border rounded-md bg-slate-200 hover:bg-white">MORE</button>
      </div>
    </div>
  );
}
