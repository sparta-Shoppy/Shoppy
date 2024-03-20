'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { stringTransform } from '@/hooks/transform';
import { ProductType } from '@/types/product-type';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedTab, setSelectedTab] = useState('높은 가격순');

  const params = useSearchParams();
  console.log('params', params.get('category'));
  // params - / 기준으로 전달
  // useSearchParams - ? 기준으로 전달

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'product'))
          // query(collection(db, 'product'), where('newProduct', '==', `${params}`))
          // query(collection(db, 'product'), where('newProduct', '==', `${params}`), orderBy('newProduct', 'desc'))
        );
        console.log('querySnapshot', querySnapshot);
        const fetchedProducts: any[] = [];

        querySnapshot.forEach((doc) => {
          const products = doc.data();
          fetchedProducts.push({ ...products, id: doc.id, products });
        });
        if (fetchedProducts.length != null) {
        }

        console.log('fetchedProducts', fetchedProducts);

        const sortedProducts =
          selectedTab === '높은 가격순'
            ? fetchedProducts.sort((a: any, b: any) => b.price - a.price)
            : fetchedProducts.sort((a: any, b: any) => a.price - b.price);

        setProducts(sortedProducts);
      } catch (error) {
        console.log('상품 데이터 가져오기 실패', error);
      }
    };

    fetchProductsData();
  }, [selectedTab]);

  return (
    <div>
      <Header />
      <SearchProduct />
      <div className="w-11/12 flex justify-end ">
        <span
          className={`cursor-pointer mr-2 ${
            selectedTab === '높은 가격순' ? 'text-zinc-400' : 'text-black hover:text-zinc-400'
          }`}
          onClick={() => setSelectedTab('높은 가격순')}
        >
          높은 가격순
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${
            selectedTab === '낮은 가격순' ? 'text-zinc-400' : 'text-black hover:text-zinc-400'
          }`}
          onClick={() => setSelectedTab('낮은 가격순')}
        >
          낮은 가격순
        </span>
      </div>
      <div className="m-auto w-full flex flex-wrap justify-center">
        {products?.map((item) => {
          return (
            <div key={item.productId} className="w-1/4 p-5">
              <div className="h-full flex flex-col justify-between items-center ">
                <img
                  src={item.image}
                  alt="상품이미지"
                  className="w-4/5 h-80 object-cover rounded-md hover:scale-95 transition-all duration-300 cursor-pointer"
                />
                <button className="w-4/5 mt-3 bg-slate-100 flex justify-center items-center text-black py-2 px-4 hover:bg-white rounded-md">
                  <span className="text-xl">담기</span> <LiaCartArrowDownSolid className="ml-2 text-3xl" />
                </button>
                <div className="pt-2 w-4/5">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-lg font-semibold">{item.price ? stringTransform(item.price) : null} 원</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <SlHeart className="text-3xl hover:text-rose-500 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 파이어베이스에서 orderby로 내림차순 정렬 시 금액이 문자열이기때문에 정렬이 잘 안됨 그래서 받아온 데이터를 사용하는 곳에서 sort로 메서드 체이닝을함
// 파이어베이스에서 orderby로 내림차순 정렬하는 방법이 궁금함

// 홈 화면 탭 클릭하면 params을 리스트페이지에 잘 넘겨주지만 파이어베이스에서 조회를 못함
