'use client';

import { db } from '@/api/fiebaseApi';
import Ask from '@/components/Ask';
import Review from '@/components/Review';
import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import Cartbutton from '@/utill/hooks/Cart';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import { userId } from '@/api/user';

export default function ProductDetailPage() {
  const [nowItem, setNowItem] = useState<ProductType[]>();
  const [heart, setHeart] = useState(false);

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
          <div className="flex justify-center items-center" key={prev.productId}>
            <img src={prev.image} />
            <div className="pl-5">
              <div>상품명 {prev.title}</div>
              <div>배송 {prev.delivery}</div>
              <div>판매자 {prev.seller}</div>
              <div>판매단위 {prev.price}</div>
              <div>중량 {prev.weight}</div>
              <div className="flex gap-2 items-center">
                <button onClick={handleHeart}>
                  <IoHeartSharp className={`${heart ? 'text-3xl text-rose-500' : 'text-3xl hover:text-rose-500'}`} />
                </button>
                <Cartbutton item={prev} userId={userId} />
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="w-4/5 flex justify-end mb-5">
        <span
          className={`cursor-pointer mr-2 ${
            selectedTab === '후기' ? 'text-cyan-400' : 'text-black hover:text-cyan-400'
          }`}
          onClick={() => setSelectedTab('후기')}
        >
          신상품
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${
            selectedTab === '문의' ? 'text-pink-300' : 'text-black hover:text-pink-300'
          }`}
          onClick={() => setSelectedTab('문의')}
        >
          베스트
        </span>
      </div> */}
      <Review />
      <Ask />
    </div>
  );
}
