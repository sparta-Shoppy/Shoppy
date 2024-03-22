'use client';

import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import { joinState } from '@/store/modules/isModalToggle';
import HomePage from './home/page';

export default function Home() {
  const isJoinToggle = useAppSelector(joinState);

  return (
    <div className={` ${isJoinToggle ? 'active' : ''}`}>
      <HomePage />
    </div>
  );
}
