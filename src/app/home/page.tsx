'use client';

import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';
import { TbMeat } from 'react-icons/tb';

export default function HomePage() {
  return (
    <div className="h-screen">
      <div className="flex m-auto w-11/12  justify-between">
        <div className="">
          <img src="assets/logo.png" alt="logo" className="w-3/6 mt-2" />
        </div>
        <div className="w-72 flex justify-evenly items-center text-l">
          <p className="cursor-pointer hover:text-slate-300 font-bold">회원가입</p>
          <p className="cursor-pointer hover:text-slate-300 font-bold">로그인</p>
        </div>
      </div>
      <div className="w-full flex justify-center gap-5 mb-5">
        <input type="text" placeholder="검색" className="flex w-3/12 p-1 w-3/10 border rounded-md" />
        <button className="hover:text-slate-300 font-bold">검색</button>
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
        <p className="flex  gap-3 items-center cursor-pointer hover:text-lime-500">
          <GiFruitBowl /> 과일/채소
        </p>
        <p className="flex items-center gap-3 cursor-pointer hover:text-rose-700">
          <TbMeat /> 고기
        </p>
        <p className="flex gap-3 items-center cursor-pointer hover:text-purple-700">
          <GiHamburger /> 가공식품
        </p>
        <p className="flex gap-3 items-center cursor-pointer hover:text-teal-600">
          <IoFishOutline /> 해산물
        </p>
      </div>
      <div className="flex justify-end mr-80 font-bold mb-5">
        {' '}
        <span className="hover:text-cyan-400 mr-2 cursor-pointer">신상품</span> ||{' '}
        <span className="hover:text-pink-300 mx-2 cursor-pointer">베스트</span>
      </div>
      <div className="flex justify-center w-4/5 m-auto gap-20">
        <div className="w-3/12 h-96 cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300">
          <img src="/assets/fast-food1.PNG" alt="갈비탕" className="w-full h-4/5 object-cover rounded-md" />
          <div className="flex justify-between p-3">
            <div>
              <p>18,980원</p>
              <p>외갓집 진심 갈비탕(냉동)</p>
            </div>
            <div className="flex justify-end gap-2 items-center">
              <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
              <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="w-3/12 h-96 cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300">
          <img src="/assets/fast-food2.PNG" alt="김치 치즈 주먹밥" className="w-full h-4/5 object-cover rounded-md" />
          <div className="flex justify-between p-3">
            <div>
              <p>12,500원</p>
              <p>한우물 김치치즈 구운주먹밥(냉동)</p>
            </div>
            <div className="flex justify-end gap-2 items-center">
              <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
              <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="w-3/12 h-96 cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300">
          <img src="/assets/fast-food3.PNG" alt="파스타" className="w-full h-4/5 object-cover rounded-md" />
          <div className="flex justify-between p-3">
            <div>
              <p>13,110원</p>
              <p>쉐프엠 베이컨까르보나라 파스타</p>
            </div>
            <div className="flex justify-end gap-2 items-center">
              <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
              <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="my-8 w-28 p-1 border rounded-md bg-slate-200 hover:bg-white">MORE</button>
      </div>
    </div>
  );
}
