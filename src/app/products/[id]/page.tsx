'use client';

import { db } from '@/api/fiebaseApi';
import Ask from '@/components/Ask';
import Review from '@/components/Review';
import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';

export default function ProductDetailPage() {
  const [nowItem, setNowItem] = useState<ProductType[]>();

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
              <div className="flex items-center gap-2">
                <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
                <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
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
