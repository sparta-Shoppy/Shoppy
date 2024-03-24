import Link from 'next/link';
import { useState } from 'react';
import { GiFruitBowl, GiHamburger } from 'react-icons/gi';
import { IoFishOutline } from 'react-icons/io5';
import { TbMeat } from 'react-icons/tb';

const Tabs = () => {
  // const [menuTabs, setMenuTabs] = useState([]);
  return (
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
  );
};

export default Tabs;
