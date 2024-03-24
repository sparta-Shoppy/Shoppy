'use client';

import Header from '@/components/common/Header';
import ProfileLikeItem from '@/components/profile/ProfileLikeItem';
import ProfileItem from '@/components/profile/ProfileWriteItem';
import { emailState, nicknameState, userState } from '@/store/modules/user';
import { useReadAskData, useReadLikeData, useReadWriteData } from '@/utill/hooks/detail/useWrite';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import { IoHeartSharp } from 'react-icons/io5';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';

export default function ProfilePage() {
  const userNickname = useAppSelector(nicknameState);
  const userEmail = useAppSelector(emailState);
  const userId = useAppSelector(userState);
  // pupCd01zjHPesDoY21OqJb6CjIX2
  // 현재 firebase를 불러오는 과정에서 렌더링이 2번 발생한다.

  const { data: writeData, isLoading: writeLoading } = useReadWriteData(userId);
  const { data: askData, isLoading: askLoading } = useReadAskData(userId);
  const { data: likeData, isLoading: LikeLoading } = useReadLikeData(userId);
  console.log(userId);

  if (writeLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div>잠시만 기다려 주세요</div>
        <img src="../../../assets/bean.gif" alt="로딩중" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full h-full p-20 bg-[#D9D9D9] ">
        {/* user 정보 */}
        <h1 className="pt-24 text-center tex text-5xl">회원정보</h1>

        <div className="p-24">
          <div className="flex flex-col gap-1 mb-20">
            <p className="text-2xl">{userNickname}</p>
            <p className="text-2xl">{userEmail}</p>
          </div>
          {/* user가 찜한 데이터 */}
          <div className="flex items-center gap-5 mb-10">
            <IoHeartSharp className={`text-6xl  text-rose-500`} />
            <p className="text-3xl">찜 목록 {likeData?.length}개</p>
          </div>
          <ul className="flex bg-white p-4 mb-32">
            <IoHeartSharp className="w-80 h-40"></IoHeartSharp>
            {likeData?.map((like) => (
              <ProfileLikeItem key={crypto.randomUUID()} props={like} />
            ))}

            <div className=" flex flex-col justify-center">
              <h3>제목입니다.</h3>
              <p>시간입니다.</p>
            </div>
          </ul>
          {/* user가 작성한 후기 내용 */}
          <div className="flex items-center gap-5 mb-10 ">
            {/* {heart ? ' text-rose-500' : ' hover:text-rose-500'} */}
            <TiPencil className={`text-6xl  `} />
            <p className="text-3xl">작성한 후기 {writeData?.length}개</p>
          </div>
          <ul className=" bg-white p-6 mb-10 ">
            {/* key={product.productId} product={product} */}
            {writeData ? (
              writeData?.map((write) => <ProfileItem key={crypto.randomUUID()} props={write} />)
            ) : (
              <div> 작성한 글이 없습니다. </div>
            )}
          </ul>
          {/* user가 작성한 문의 내용 */}
          <div className="flex items-center gap-5 mb-10">
            {/* {heart ? ' text-rose-500' : ' hover:text-rose-500'} */}
            <MdOutlineQuestionAnswer className={`text-6xl  `} />
            <p className="text-3xl">작성한 문의 {askData?.length}개</p>
          </div>
          <ul className="flex-col bg-white p-6 mb-10">
            {askData && askData?.map((ask) => <ProfileItem key={crypto.randomUUID()} props={ask} />)}
            {!askData && <div>작성한 글이 없습니다.</div>}
          </ul>
        </div>
      </div>
    </>
  );
}

// like 임시 인터페이스
export interface likeInterface {
  category: string;
  createdAt: Date;
  delivery: string;
  id: string;
  image: string;
  info: string;
  likeId: string;
  price: number;
  productId: string;
  products?: [];
  quantity: number;
  seller: string;
  title: string;
  weight: string;
  userId: string;
}
