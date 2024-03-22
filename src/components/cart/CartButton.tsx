import { db } from '@/api/fiebaseApi';
import { CartType } from '@/types/cart-type';
import { ProductType } from '@/types/product-type';
import { useCreateCartData } from '@/utill/hooks/cart/useCart';

import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { TiShoppingCart } from 'react-icons/ti';
import { toast } from 'react-toastify';

interface CartButtonProps {
  item: CartType;
  userId: string;
}

export default function Cartbutton({ item, userId }: CartButtonProps) {
  const { createCartMutate } = useCreateCartData();

  const onClickCart = () => {
    createCartMutate(
      {
        item: {
          productId: item.productId,
          image: item.image,

          title: item.title,
          info: item.info,

          price: item.price,

          quantity: item.quantity
        },
        userId: userId
      },
      {
        onSuccess: () => {
          toast.success('장바구니에 추가되었습니다.');
        },
        onError: () => {
          toast.error('장바구니에 추가하지 못했습니다.');
        }
      }
    );
  };

  return (
    <button onClick={onClickCart}>
      <TiShoppingCart className="text-2xl ml-1 mr-1" />
    </button>
  );
}
