'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { ProductType } from '@/types/product-type';
import { DocumentData, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [selectedTab, setSelectedTab] = useState('높은 가격순');

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'product'), orderBy('price', 'desc')));

        console.log('querySnapshot', querySnapshot);

        const fetchedProducts: any = [];

        querySnapshot.forEach((doc) => {
          console.log('doc', doc);
          const products = doc.data();
          console.log('products', products);
          fetchedProducts.push({ ...products, id: doc.id, products });
        });
        console.log('fetchedProducts', fetchedProducts);
        if (fetchedProducts.length != null) {
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.log('상품 데이터 가져오기 실패', error);
      }
    };

    fetchProductsData();
  }, []);

  const stringTransform = (price: number) => {
    return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  const productsSort = () => {
    if (selectedTab === '높은 가격순') {
      setSelectedTab('높은 가격순');
      // const productsAsc = query(citiesRef, orderBy('name', 'desc'));
    }

    if (selectedTab === '낮은 가격순') {
      setSelectedTab('낮은 가격순');
    }
  };

  return (
    <div>
      <Header />
      <SearchProduct />
      <div className="w-11/12 flex justify-end ">
        <span
          className={`cursor-pointer mr-2 ${
            selectedTab === '높은 가격순' ? 'text-zinc-400' : 'text-black hover:text-zinc-400'
          }`}
          onClick={productsSort}
        >
          높은 가격순
        </span>
        ||
        <span
          className={`cursor-pointer mx-2 ${
            selectedTab === '낮은 가격순' ? 'text-zinc-400' : 'text-black hover:text-zinc-400'
          }`}
          onClick={productsSort}
        >
          낮은 가격순
        </span>
      </div>
      <div className="m-auto w-full flex flex-wrap justify-center">
        {products.map((item) => (
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
                    <p className="text-lg font-semibold">{stringTransform(item.price)} 원</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <SlHeart className="text-3xl hover:text-rose-500 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
