'use client';

import Image from 'next/image';
import HomePage from './home/page';
import { useAppSelector } from '@/hooks/useRedux';
import { joinState } from '@/store/modules/isModalToggle';

export default function Home() {
  const selector = useAppSelector(joinState);
  console.log(selector);
  return (
    <div className={` ${selector ? 'active' : ''}`}>
      <HomePage />
    </div>
  );
}
