'use client';

import { db } from '@/api/fiebaseApi';
import Ask from '@/components/detail/ask/Ask';
import Review from '@/components/detail/review/Review';
import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import Cartbutton from '@/components/cart/CartButton';
import { userState } from '@/store/modules/user';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

export default function ProductDetailPage() {
  const [nowItem, setNowItem] = useState<ProductType[]>();
  const [heart, setHeart] = useState(false);
  const [selectedTab, setSelectedTab] = useState(true);

  const userId = useAppSelector(userState);

  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const fetchItemData = async () => {
      const itemDB = query(collection(db, 'product'), where('productId', '==', params.id));
      const querySnapshot = await getDocs(itemDB);

      const initialData: any = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ ...doc.data() });
      });

      setNowItem(initialData);
    };

    fetchItemData();
  }, []);

  const params = useParams();

  return (
    <div>
      <Header />
      {nowItem?.map((prev) => {
        return (
          <div className="w-3/5 m-auto h-full pt-24 flex justify-around items-center" key={prev.productId}>
            <img className="w-1/4 h-1/4" src={prev.image} alt="상품이미지" />
            <div className="flex flex-col gap-10 text-xl">
              <div>상품명 : {prev.title}</div>
              <div>배송 : {prev.delivery}</div>
              <div>판매자 : {prev.seller}</div>
              <div>판매단위 : {new Intl.NumberFormat('ko-KR').format(prev.price)}</div>
              <div>중량 : {prev.weight}</div>
              <div className="flex gap-2 items-center">
                <button onClick={handleHeart}>
                  <IoHeartSharp className={`${heart ? 'text-3xl text-rose-500' : 'text-3xl hover:text-rose-500'}`} />
                </button>
                <Cartbutton item={prev} userId={userId} />
                <button className="bg-slate-100 w-80 hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-md">
                  구매
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-24 m-auto w-3/5 flex justify-end gap-5 pt-8 pb-24 text-2xl border-t border-gray-300">
        <span
          className={` cursor-pointer  ${selectedTab === true ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
          onClick={() => setSelectedTab(true)}
        >
          후기
        </span>
        ||
        <span
          className={`cursor-pointer ${selectedTab === false ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
          onClick={() => setSelectedTab(false)}
        >
          문의
        </span>
      </div>
      {selectedTab ? <Review /> : <Ask />}
    </div>
  );
}
