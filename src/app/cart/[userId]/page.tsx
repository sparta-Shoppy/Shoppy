'use client';

import { db } from '@/api/fiebaseApi';

import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { TiShoppingCart } from 'react-icons/ti';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';
import CartItem from '@/components/cart/CartItem';
import { useAppSelector } from '@/utill/hooks/useRedux';
import { userState } from '@/store/modules/user';

export default function CartPage() {
  const [userCarts, setUserCart] = useState<ProductType[]>([]);
  const { userId } = useAppSelector(userState);
  console.log('유저카트', userCarts);

  useEffect(() => {
    const fetchCartData = async () => {
      const cartRef = doc(db, 'carts', userId);

      console.log('cartRef', cartRef);

      try {
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          const cartData = cartSnap.data();

          if (cartData.products && Array.isArray(cartData.products)) {
            setUserCart(cartData.products);
          }
        }
      } catch {}
    };

    fetchCartData();
  }, []);

  console.log('userCart', userCarts);

  const deliveryprice = 3000;
  const hasProducts = userCarts && userCarts.length > 0;
  const total = userCarts && userCarts.reduce((prev, current) => prev + current.price * current.quantity, 1);
  const totalPrice = total + deliveryprice;
  return (
    <div className="w-full h-lvh">
      <Header />
      <article className="flex flex-col w-full items-center h-full">
        <div className="w-4/5 h-4/5 items-center">
          <section className="flex flex-col items-center bg-10">
            <h1 className="flex flex-row text-5xl mb-10">
              장바구니
              <TiShoppingCart className="ml-2" />
            </h1>
          </section>
          <div className="flex flex-row w-full mt-30 mb-5 text-2xl">
            <button>전체 삭제하기</button>
          </div>

          <section className="flex flex-row justify-between w-full h-full ">
            <article className="flex flex-col items-center border h-full w-3/4 overflow-auto">
              <div className="p-10 w-full">
                {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해주세요!</p>}
                {hasProducts && (
                  <>
                    <ul>
                      {userCarts && userCarts.map((product) => <CartItem key={product.productId} product={product} />)}
                    </ul>
                  </>
                )}
              </div>
            </article>
            <article className="flex flex-col w-1/4 mt-20 m-10 text-xl">
              <div className="flex flex-row justify-between">
                <p>상품금액</p>
                <p>{total}원</p>
              </div>
              <div className="flex flex-row justify-between mt-3 text-[#ccc]">
                <p>배송비</p>
                <p>3,000 원</p>
              </div>

              <div className="flex flex-row justify-between text-2xl mt-5 border-t-2 border-[#B4B4B8]-500">
                <p className="mt-5">결제예정금액</p>
                <p className="mt-5">
                  <span className="text-3xl">{totalPrice}</span>원
                </p>
              </div>
            </article>
          </section>
        </div>
      </article>
    </div>
  );
}
