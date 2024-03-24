import { NewReviewType } from '@/types/product-type';
import { useRouter } from 'next/navigation';
import React from 'react';

//상위 컴포넌트가 클라이언트 컴포넌트일 경우 하위 컴포넌트들 또한, 클라이언트 컴포넌트로 선언된다.
const ProfileWriteItem = ({ props }: { props: NewReviewType }) => {
  const router = useRouter();

  return (
    <li
      className="border-b-2 border-[#B4B4B8]-500 p-6 cursor-pointer hover:text-zinc-400"
      onClick={() => router.push(`/products/${props.productId}`)}
    >
      <div className="flex gap-40 pb-4 ">
        <h3>{props.nickname}</h3>
        <p>{props.createdAt}</p>
      </div>
      <p className="text-2xl">{props.content}</p>
    </li>
  );
};

export default ProfileWriteItem;
