import { userId } from '@/api/user';
import { ProductType } from '@/types/product-type';
import Cartbutton from '@/utill/hooks/Cart';
import { stringTransform } from '@/utill/hooks/transform';

import { useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';

function ProductItems({ item }: { item: ProductType }) {
  const [heart, setHeart] = useState(false);

  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart((prev) => {
      return !prev;
    });
  };
  return (
    <div key={item.productId} className="w-1/4 p-5">
      <div className="h-full flex flex-col justify-between items-center ">
        <img
          src={item.image}
          alt="상품이미지"
          className="w-4/5 h-80 object-cover rounded-md hover:scale-95 transition-all duration-300 cursor-pointer"
        />
        <button className="w-4/5 mt-3 bg-slate-100 flex justify-center items-center text-black py-2 px-4 hover:bg-white rounded-md">
          <span className="text-xl">담기</span> <Cartbutton item={item} userId={userId} />
        </button>
        <div className="pt-2 w-4/5">
          <p className="text-lg font-semibold">{item.title}</p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-lg font-semibold">{item.price ? stringTransform(item.price) : null} 원</p>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={handleHeart}>
                <IoHeartSharp className={`${heart ? 'text-3xl text-rose-500' : 'text-3xl hover:text-rose-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
