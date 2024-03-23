'use client';

import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { ProductType } from '@/types/product-type';
import { useDeleteCartData, useUpdateCartData } from '@/utill/hooks/cart/useCart';
import { userState } from '@/store/modules/user';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

interface ProductProps {
  product: ProductType;
}
export default function CartItem({ product }: ProductProps) {
  const { productId, image, title, price, quantity } = product;
  const { deleteCartMutate } = useDeleteCartData();
  const { updateCartMutate } = useUpdateCartData();

  const productPrice = price * quantity;

  const userId = useAppSelector(userState);

  const onClickCheckBox = () => {};
  // const handleMinus = async () => {
  //   if (quantity < 2) return;
  //   try {
  //     await updateCartData({ userId, productId: productId ?? '', quantity: quantity - 1 });
  //   } catch (error: any) {
  //     console.log('faild to addOrUpdateToCart', error.messege);
  //   }
  // };

  const handleMinus = async (userId: string, productId: string, quantity: number) => {
    if (quantity < 2) return;
    updateCartMutate({ userId, productId, quantity: quantity - 1 });
  };

  const handlePlus = async (userId: string, productId: string, quantity: number) => {
    updateCartMutate({ userId, productId, quantity: quantity + 1 });
  };

  const handleDelete = async (productId: string) => {
    deleteCartMutate({ productId, userId });
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
        <div className="flex gap-10 items-center text-2xl transition-all">
          <FaMinusCircle
            className={`transition-all cursor-pointer ${
              quantity <= 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-black'
            }`}
            onClick={() => handleMinus(userId, productId!, quantity)}
            style={{ pointerEvents: quantity <= 1 ? 'none' : 'auto' }}
          />

          <p>{quantity}</p>

          <FaPlusCircle
            className="transition-all cursor-pointer hover:"
            onClick={() => handlePlus(userId, productId!, quantity)}
          />
        </div>
        <div className="absolute right-5 top-20 text-xl whitespace-nowrap">
          <span className="text-2xl"> {new Intl.NumberFormat('ko-KR').format(productPrice)}</span> 원
        </div>
      </div>
    </li>
  );
}
