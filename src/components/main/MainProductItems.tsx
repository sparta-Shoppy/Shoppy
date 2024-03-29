import { userState } from '@/store/modules/user';
import { ProductType } from '@/types/product-type';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import Link from 'next/link';
import { useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import Cartbutton from '../cart/CartButton';

function MainProductItems({ item }: { item: ProductType }) {
  const [heart, setHeart] = useState(false);

  const userId = useAppSelector(userState);
  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart((prev) => {
      return !prev;
    });
  };

  return (
    <div
      key={item.productId}
      className="w-1/4 h-96 flex flex-wrap justify-center cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300 pb-5"
    >
      <Link href={`/products/${item.productId}`} className="w-full h-4/5">
        <img src={item.image} alt="상품" className="w-full h-full object-cover rounded-md" />
      </Link>
      <div className="w-full flex justify-between p-3">
        <div className="whitespace-nowrap  w-9/12">
          <p className="text-lg">{item.title}</p>
          <p className="text-lg  overflow-hidden overflow-ellipsis w-11/12">{item.info}</p>
          <p>{new Intl.NumberFormat('ko-KR').format(item.price)} 원</p>
        </div>
        <div className="flex justify-between gap-2 items-center pl-5">
          <button onClick={handleHeart}>
            <IoHeartSharp className={`${heart ? 'text-3xl text-rose-500' : 'text-3xl hover:text-rose-500'}`} />
          </button>
          <Cartbutton item={item} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default MainProductItems;
