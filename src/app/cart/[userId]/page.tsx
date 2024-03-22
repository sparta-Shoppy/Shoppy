'use client';

import { db } from '@/api/fiebaseApi';
import { userId } from '@/api/user';
import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { TiShoppingCart } from 'react-icons/ti';
import CartItem from '@/components/cart/CartItem';
import { useReadCartData } from '@/utill/hooks/cart/useCart';

export default function CartPage() {
  const { data: carts, isLoading, error } = useReadCartData();

  console.log('내가 카트', carts);

  if (error) return console.log(error.message);

  const deliveryprice = 3000;
  const hasProducts = carts && carts.length > 0;
  const total = carts && carts.reduce((prev, current) => prev + current.price * current.quantity, 0);
  const totalPrice = total;

  return (
    <div className="w-full h-lvh">
      <Header />
      <article className="flex flex-col w-full items-center h-full">
        <div className="w-4/5 h-4/5 items-center">
          <section className="flex flex-col items-center bg-10">
            <h1 className="flex flex-row text-5xl mb-10">
              <TiShoppingCart className=" text-6xl -translate-y-3 mr-2" />
              장바구니
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
                    <ul>{carts && carts.map((product) => <CartItem key={product.productId} product={product} />)}</ul>
                  </>
                )}
              </div>
            </article>
            <article className="flex flex-col w-1/4  m-10 text-xl border p-9 h-52">
              <div className="flex flex-row justify-between">
                <p>상품금액</p>
                {!hasProducts ? <p> 원</p> : <p>{total}원</p>}
              </div>
              <div className="flex flex-row justify-between mt-3 text-[#ccc]">
                <p>배송비</p>
                {!hasProducts ? <p> 원</p> : <p> 3000원</p>}
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
