'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';
import { TbMeat } from 'react-icons/tb';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState('신상품');
  // const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   setIsMounted(true);
  // });

  const pagePathHandler = () => {
    // if (isMounted) {
    router.push('/products');
    // }
  };

  return (
    <div className="h-screen">
      <div className="flex m-auto w-11/12  justify-between items-center">
        <div className="">
          <img src="assets/logo.png" alt="logo" className="w-3/6" />
        </div>
        <div className="w-72 flex justify-evenly items-center text-l">
          <p className="cursor-pointer hover:text-zinc-400 font-bold">회원가입</p>
          <p className="cursor-pointer hover:text-zinc-400 font-bold">로그인</p>
        </div>
      </div>
      <div className="w-full flex justify-center gap-5 pb-5">
        <input type="text" placeholder="검색어를 입력하세요" className="flex w-3/12 p-1 w-3/10 border rounded-md" />
        <button className="hover:text-zinc-400 font-bold">검색</button>
      </div>
      <div className="carousel w-full h-80">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="assets/main1.PNG" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="assets/main2.PNG" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="assets/main3.PNG" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="assets/main4.PNG" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly w-4/5 p-10 m-auto text-xl font-bold">
        <div onClick={pagePathHandler} className="flex  gap-3 items-center cursor-pointer hover:text-zinc-500">
          <GiFruitBowl /> 과일/채소
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:text-zinc-500">
          <TbMeat /> 고기
        </div>
        <div className="flex gap-3 items-center cursor-pointer hover:text-zinc-500">
          <GiHamburger /> 가공식품
        </div>
        <div className="flex gap-3 items-center cursor-pointer hover:text-zinc-500">
          <IoFishOutline /> 해산물
        </div>
      </div>
      <div className="w-4/5 flex justify-end font-bold mb-5">
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
