'use client';

import Header from '@/components/common/Header';
import ProfileItem from '@/components/profile/ProfileWriteItem';
import { emailState, nicknameState, userState } from '@/store/modules/user';
import { useReadAskData, useReadWriteData } from '@/utill/hooks/detail/useWrite';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';

export default function ProfilePage() {
  const userNickname = useAppSelector(nicknameState);
  const userEmail = useAppSelector(emailState);
  const userId = useAppSelector(userState);

  const { data: writeData, isLoading: writeLoading } = useReadWriteData(userId);
  const { data: askData, isLoading: askLoading } = useReadAskData(userId);

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

          {/* user가 작성한 후기 내용 */}
          <div className="flex items-center gap-5 mb-10 ">
            <TiPencil className={`text-6xl  `} />
            <p className="text-3xl">작성한 후기 {writeData?.length}개</p>
          </div>
          <ul className=" bg-white p-6 mb-10 ">
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
