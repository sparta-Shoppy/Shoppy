import { stringTransform } from '@/hooks/transform';
import { ProductType } from '@/types/product-type';
import { useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import { LiaCartArrowDownSolid } from 'react-icons/lia';

function MainProductItems({ item }: { item: ProductType }) {
  const [heart, setHeart] = useState(false);

  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart(!heart);
  };

  return (
    <div
      key={item.productId}
      className="w-1/4 h-96 flex flex-wrap justify-center cursor-pointer rounded-md hover:shadow-lg hover:shadow hover:scale-110 transition-all duration-300 pb-5"
    >
      <img src={item.image} alt="상품" className="w-full h-4/5 object-cover rounded-tl-md rounded-tr-md" />
      <div className="flex justify-between p-3">
        <div>
          <p>{item.title}</p>
          <p>{stringTransform(item.price)}</p>
        </div>
        <div className="flex justify-end gap-2 items-center pl-5">
          <IoHeartSharp
            onClick={handleHeart}
            className={`${
              heart ? 'text-3xl text-rose-500 cursor-pointer"' : 'text-3xl hover:text-rose-500 cursor-pointer'
            }`}
          />
          <LiaCartArrowDownSolid className="text-4xl hover:text-stone-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default MainProductItems;
