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

  const onClickCheckBox = () => {};

  return (
    <li key={productId}>
      <label
        htmlFor={productId}
        className="flex justify-between items-center space-x-2 border-b-2 border-[#B4B4B8]-500 p-3 w-full"
      >
        <div className=" flex items-center gap-10 ">
          <input type="checkbox" id={productId} className=" w-4 h-4" onClick={onClickCheckBox} />
          <img src={image} alt={title} className="w-60 h-60" />
          <h3 className=" text-xl">{title}</h3>
        </div>

        <div className="relative">
          <button className="text-3xl absolute right-0 -top-24 text-[#ccc]">&times;</button>
          <div className="flex gap-10 items-center text-2xl">
            <FaMinusCircle />
            <p>{quantity}</p>
            <FaPlusCircle />
          </div>
          <div className="absolute right-5 top-20 text-xl whitespace-nowrap">
            <span className="text-2xl">{productPrice}</span> 원
          </div>
        </div>
      </label>
    </li>
  );
}
