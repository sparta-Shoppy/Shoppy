'use client';

import { db } from '@/api/fiebaseApi';
import Header from '@/components/common/Header';
import { emailState, nicknameState, userState } from '@/store/modules/user';
import { NewReviewType } from '@/types/product-type';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoHeartSharp } from 'react-icons/io5';

// 서버 컴포넌트로 사용할 수 없는이유
// 클라이언트 측에서는 api 요청을 보내고 api요청을 받은 백엔드 측에서는 서버에 있는 데이터를 가져와야하지만
// 현재 baas 형태의 firebase를 사용하여 firebase측에서 백엔드 및 서버측 관리를 전부 하고있으므로 사용 불가

export default function ProfilePage() {
  const userNickname = useAppSelector(nicknameState);
  const userEmail = useAppSelector(emailState);
  const userId = useAppSelector(userState);
  const [writeState, setWriteState] = useState<NewReviewType[]>();

  useEffect(() => {
    const fetchItemData = async () => {
      const itemDB = query(collection(db, 'review'), where('writerId', '==', userId));
      const querySnapshot = await getDocs(itemDB);

      const initialData: any = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ ...doc.data() });
      });

      setWriteState(initialData);
    };

    fetchItemData();
  }, []);

  console.log('writeState', writeState);

  return (
    <>
      <Header />
      <div className="w-full h-full p-20 bg-slate-600">
        {/* user 정보 */}
        <h1 className="pt-24 text-center tex text-5xl">회원정보</h1>
        <div className="p-24">
          <div className="flex flex-col gap-1 mb-20">
            <p className="text-2xl">{userNickname}</p>
            <p className="text-2xl">{userEmail}</p>
          </div>
          {/* user가 찜한 데이터 */}
          <div className="flex items-center gap-5 mb-10">
            {/* {heart ? ' text-rose-500' : ' hover:text-rose-500'} */}
            <IoHeartSharp className={`text-6xl  text-rose-500`} />
            <p className="text-3xl">찜 목록 개수</p>
          </div>
          <div className="flex bg-white p-4 mb-32">
            {/* 상품 이미지 */}
            <IoHeartSharp className="w-80 h-40"></IoHeartSharp>
            {/* <img src={img} alt={title} className="w-60 h-60" /> */}

            <div className=" flex flex-col justify-center">
              <h3>제목입니다.</h3>
              <p>시간입니다.</p>
            </div>
          </div>
          {/* user가 작성한 후기 내용 */}
          <div className="flex items-center gap-5 mb-10 ">
            {/* {heart ? ' text-rose-500' : ' hover:text-rose-500'} */}
            <IoHeartSharp className={`text-6xl  text-rose-500`} />
            <p className="text-3xl">작성한 후기 개수</p>
          </div>
          <div className="  bg-white p-6 mb-10 border-b">
            <div className="flex gap-40 pb-4">
              <h3>제목입니다.</h3>
              <p>시간입니다.</p>
            </div>
            <p className="text-2xl">내용</p>
          </div>
          {/* user가 작성한 문의 내용 */}
          <div className="flex items-center gap-5 mb-10">
            {/* {heart ? ' text-rose-500' : ' hover:text-rose-500'} */}
            <IoHeartSharp className={`text-6xl  text-rose-500`} />
            <p className="text-3xl">작성한 리뷰 개수</p>
          </div>
          <div className="flex-col bg-white p-6 mb-10">
            <div className="flex gap-40 pb-4">
              {/* <h3>{writeState[0]!.content}</h3> */}
              <p>시간입니다.</p>
            </div>
            <p className="text-2xl">내용</p>
          </div>
        </div>
      </div>
    </>
  );
}

const fetchItemData = async (userId: string): Promise<NewReviewType> => {
  const itemDB = query(collection(db, 'product'), where('writerId', '==', userId));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};
