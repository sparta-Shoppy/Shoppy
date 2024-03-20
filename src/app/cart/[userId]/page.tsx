'use client';

import Header from '@/components/common/Header';
import { ProductType } from '@/types/product-type';
import Cartbutton from '@/utill/hooks/Cart';
import { TiShoppingCart } from 'react-icons/ti';

export default function CartPage() {
  const hasProducts = '';
  //products && products.length > 0;

  return (
    <div className="w-full h-lvh">
      <Header />
      <article className="flex flex-col w-full items-center h-full">
        <div className="w-4/5 h-4/5 items-center">
          <section className="flex flex-col items-center">
            <h1 className="flex flex-row text-5xl">
              장바구니
              <TiShoppingCart className="ml-2" />
            </h1>
          </section>
          <div className="flex flex-row w-full ">
            <button>삭제하기</button>
          </div>

          <section className="flex flex-row justify-between w-full h-full">
            <article className="flex flex-col items-center border h-full w-3/4 mt-10">
              <div className="p-10">
                {!hasProducts && <p className="text-lg ">장바구니에 상품이 없습니다. 열심히 쇼핑해주세요</p>}
              </div>
            </article>
            <article className="flex flex-col w-1/4 mt-20 m-10 text-2xl">
              <div className="flex flex-row justify-between">
                <p>상품금액</p>
                <p>{}원</p>
              </div>
              <div className="flex flex-row justify-between mt-3">
                <p>배송비</p>
                <p>{}원</p>
              </div>

              <div className="flex flex-row justify-between mt-5 border-t-2 border-[#B4B4B8]-500">
                <p className="mt-5">결제예정금액</p>
                <p className="mt-5">{}원</p>
              </div>
            </article>
          </section>
        </div>
      </article>
    </div>
  );
}
