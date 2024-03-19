'use client';
import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import SearchProduct from '@/components/common/SearchProduct';
import { ProductType } from '@/types/product-type';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LiaCartArrowDownSolid } from 'react-icons/lia';
import { SlHeart } from 'react-icons/sl';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'product'));
        const fetchedProducts: any = [];
        querySnapshot.forEach((doc) => {
          const products = doc.data().newProduct;
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

  return (
    <div>
      <Header />
      <SearchProduct />
      <div className="m-auto w-full flex flex-wrap justify-center">
        {products.map((item) => (
          <div key={item.productId} className="w-1/3 pt-5 h-full flex justify-center">
            <div className="w-3/5 h-full flex flex-wrap justify-evenly">
              <img
                src={item.image}
                alt="상품이미지"
                className="w-4/5 h-80 object-cover rounded-md hover:scale-95  duration-300 cursor-pointer"
              />
              <button className="w-4/5 mt-3 bg-slate-100 flex justify-center items-center text-black py-2 px-4 hover:bg-white rounded-md">
                <span className="text-xl">담기</span> <LiaCartArrowDownSolid className="ml-2 text-3xl" />
              </button>
              <div className="pt-2 w-4/5">
                <p className="text-lg font-semibold">{item.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-lg font-semibold">{item.price} 원</p>
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
