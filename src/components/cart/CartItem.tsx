'use client';

import { addOrUpdateToCart, db } from '@/api/fiebaseApi';
import { userId } from '@/api/user';

import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { ProductType } from '@/types/product-type';
import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { update } from 'firebase/database';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/utill/hooks/useRedux';
import { userState } from '@/store/modules/user';

interface ProductProps {
  product: ProductType;
}

export default function CartItem({ product }: ProductProps) {
  const { productId, image, title, price, quantity } = product;
  const { userId } = useAppSelector(userState);

  console.log(userId);
  const productPrice = price * quantity;

  const onClickCheckBox = () => {};
  const handleMinus = async () => {
    if (quantity < 2) return;
    try {
      await addOrUpdateToCart({ userId: userId ?? '', productId: productId ?? '', quantity: quantity - 1 });
    } catch (error: any) {
      console.log('faild to addOrUpdateToCart', error.messege);
    }
  };

  const handlePlus = async () => {
    await addOrUpdateToCart({ userId: userId ?? '', productId: productId ?? '', quantity: quantity + 1 });
  };

  const handleDelete = async (productId: string) => {
    try {
      const cartRef = doc(db, 'carts', userId!);
      const cartSnap = await getDoc(cartRef);
      const products = cartSnap.data()?.products;

      const productToRemove = products?.find((p: ProductType) => p.productId === productId);

      if (productToRemove) {
        await updateDoc(cartRef, { products: arrayRemove(productToRemove) });
      }
    } catch (error: any) {
      toast.error('삭제에 실패했습니다.', error.messege);
    }
  };

  return (
    <li
      key={productId}
      className="flex justify-between items-center space-x-2 border-b-2 border-[#B4B4B8]-500 p-3 w-full"
    >
      <label htmlFor={productId}>
        <div className=" flex items-center gap-10 ">
          <input type="checkbox" id={productId} className=" w-4 h-4" onClick={onClickCheckBox} />
          <img src={image} alt={title} className="w-60 h-60" />
          <h3 className=" text-xl">{title}</h3>
        </div>
      </label>
      <div className="relative">
        <button //
          className="text-3xl absolute right-0 -top-24 text-[#ccc]"
          onClick={() => handleDelete(productId!)}
        >
          &times;
        </button>
        <div className="flex gap-10 items-center text-2xl">
          <button onClick={handleMinus}>
            <FaMinusCircle />
          </button>
          <p>{quantity}</p>
          <button onClick={handlePlus}>
            <FaPlusCircle />
          </button>
        </div>
        <div className="absolute right-5 top-20 text-xl whitespace-nowrap">
          <span className="text-2xl">{productPrice}</span> 원
        </div>
      </div>
    </li>
  );
}
