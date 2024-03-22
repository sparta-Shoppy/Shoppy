'use client';

import { joinState } from '@/store/modules/isModalToggle';
import HomePage from './home/page';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

export default function Home() {
  const isJoinToggle = useAppSelector(joinState);

  return (
    <div className={` ${isJoinToggle ? 'active' : ''}`}>
      <HomePage />
    </div>
  );
}
