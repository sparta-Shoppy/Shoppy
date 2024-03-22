import { ProductType } from '@/types/product-type';
import { useCreateCartData } from '@/utill/hooks/cart/useCart';
import { TiShoppingCart } from 'react-icons/ti';
import { toast } from 'react-toastify';

interface CartButtonProps {
  item: ProductType;
  userId: string;
}

export default function Cartbutton({ item, userId }: CartButtonProps) {
  const { createCartMutate } = useCreateCartData();

  console.log('카트버튼', userId);

  const onClickCart = () => {
    createCartMutate(
      {
        item: {
          productId: item.productId!,
          image: item.image,
          category: item.category,
          title: item.title,
          info: item.info,
          delivery: item.delivery,
          seller: item.seller,
          price: item.price,
          weight: item.weight,
          createdAt: item.createdAt,
          quantity: item.quantity
        },
        userId: userId
      },
      {
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
