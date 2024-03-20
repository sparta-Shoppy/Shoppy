'use client';

import { db } from '@/api/fiebaseApi';
import { userId } from '@/api/user';
import Header from '@/components/common/Header';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { TiShoppingCart } from 'react-icons/ti';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';
import { ProductType } from '@/types/product-type';

interface ProductProps {
  product: ProductType;
}

export default function CartItem({ product }: ProductProps) {
  const [userCarts, setUserCart] = useState<ProductType[]>([]);

  const { productId, image, title, price, quantity } = product;

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
  const productPrice = price * quantity;

  return (
    <div key={productId} className="flex flex-row items-center border-b-2 border-[#B4B4B8]-500 p-3 w-full">
      <div className="flex flex-row align-middle items-center p-3">
        <input type="checkbox" className="mr-10 w-4 h-4" />
        <img src={image} alt={title} className="w-60 h-60" />
      </div>
      <div className="flex flex-col ml-10">
        <h3 className="mb-6 text-xl">{title}</h3>
      </div>
      <div className="flex flex-col justify-end">
        <div className="flex flex-row-reverse gap-5 ">
          <FaPlusCircle />
          <p>{quantity}</p>
          <FaMinusCircle />
        </div>
        <div>{productPrice} 원</div>
      </div>
    </div>
  );
}
