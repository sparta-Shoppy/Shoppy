import { userState } from '@/store/modules/user';
import { useReadCartData } from '@/utill/hooks/cart/useCart';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

import { TiShoppingCart } from 'react-icons/ti';

export default function CartStatus() {
  const userId = useAppSelector(userState);

  const { data: carts } = useReadCartData(userId);
  const status = carts?.length;

  return (
    <div className="flex flex-row relative -translate-y-1">
      <TiShoppingCart className="text-4xl ml-1 mr-1" />
      <p className="absolute -right-1 -top-1 bg-red-700 rounded-full w-5 h-5 text-sm text-center leading-6 text-white">
        {status}
      </p>
    </div>
  );
}
// /-translate-y-1 : 수직으로 움직이게 할 수 있다. (상하전체)
