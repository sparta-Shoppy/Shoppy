import { likeInterface } from '@/app/profile/page';
import { useRouter } from 'next/navigation';
import React from 'react';

const ProfileLikeItem = ({ props }: { props: likeInterface }) => {
  const router = useRouter();
  return (
    <li
      className="border-b-2 border-[#B4B4B8]-500 p-6 cursor-pointer hover:text-zinc-400"
      onClick={() => router.push(`/products/${props.productId}`)}
    >
      <img src={props.image} alt={'찜한 이미지입니다.'} className="w-60 h-60" />
      <div className="flex gap-40 pb-4">
        <h3>{props.title}</h3>
        <p>{props.price}</p>
      </div>
      <p className="text-2xl">{props.delivery}</p>
    </li>
  );
};

export default ProfileLikeItem;
