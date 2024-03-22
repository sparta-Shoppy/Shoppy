import { useReadCartData } from '@/utill/hooks/cart/useCart';
import { TiShoppingCart } from 'react-icons/ti';

export default function CartStatus() {
  const { data: carts } = useReadCartData();
  const status = carts?.length;

  return (
    <div className="flex flex-row">
      장바구니
      <TiShoppingCart className="text-2xl ml-1 mr-1" />
      <p>{status}</p>
    </div>
  );
}
