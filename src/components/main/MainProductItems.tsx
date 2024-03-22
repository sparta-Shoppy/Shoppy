import { userId } from '@/api/user';
import { ProductType } from '@/types/product-type';

import { stringTransform } from '@/utill/hooks/transform';
import { useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import Cartbutton from '../cart/CartButton';

function MainProductItems({ item }: { item: ProductType }) {
  const [heart, setHeart] = useState(false);

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
      <img src={item.image} alt="상품" className="w-full h-4/5 object-cover rounded-md" />
      <div className="w-full flex justify-between p-3">
        <div>
          <p>{item.title}</p>
          <p>{stringTransform(item.price)}</p>
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
