'use client';
import { db } from '@/api/fiebaseApi';
import { userId } from '@/api/user';
import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import Cartbutton from '@/utill/hooks/Cart';
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
          // console.log('products', products);
          fetchedProducts.push({ ...products, id: doc.id, products });
        });
        // console.log('fetchedProducts', fetchedProducts);
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
      {products.map((item, idx) => {
        return (
          <div key={idx} className="flex">
            <div className="w-1/5 h-96 cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300 pb-5">
              <img src={item.image} alt="가공식품" className="w-full h-4/5 object-cover rounded-md" />
              <div className="flex justify-between p-3">
                <div>
                  <p>{item.price}</p>
                  <p>{item.title}</p>
                </div>
                <div className="flex justify-end gap-2 items-center pl-5">
                  <SlHeart className="text-2xl hover:text-rose-500 cursor-pointer" />
                  <Cartbutton item={item} userId={userId} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
