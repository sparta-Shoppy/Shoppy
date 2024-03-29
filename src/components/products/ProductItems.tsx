import { ProductType } from '@/types/product-type';
import Link from 'next/link';
import Cartbutton from '@/components/cart/CartButton';
import { useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';
import { userState } from '@/store/modules/user';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

function ProductItems({ item }: { item: ProductType }) {
  const [heart, setHeart] = useState(false);

  const userId = useAppSelector(userState);

  // 하트 클릭 시 색상 변경
  const handleHeart = () => {
    setHeart((prev) => {
      return !prev;
    });
  };
  return (
    <div key={item.productId} className="w-1/4 p-5">
      <div className="h-full flex flex-col justify-between items-center ">
        <Link href={`/products/${item.productId}`} className="w-4/5 h-80">
          <img
            src={item.image}
            alt="상품이미지"
            className="w-full h-80 object-cover rounded-md hover:scale-95 transition-all duration-300 cursor-pointer"
          />
        </Link>
        <div className="w-4/5 mt-3 bg-slate-100 flex justify-center items-center text-black py-2 px-4 hover:bg-white rounded-md">
          <span className="text-xl">담기</span> <Cartbutton item={item} userId={userId} />
        </div>
        <div className="pt-2 w-4/5">
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="text-lg font-semibold">{item.info}</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{new Intl.NumberFormat('ko-KR').format(item.price)} 원</p>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={handleHeart}>
                <IoHeartSharp className={`text-4xl${heart ? ' text-rose-500' : ' hover:text-rose-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
