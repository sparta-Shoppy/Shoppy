import Header from '@/components/common/Header';
import { IoHeartSharp } from 'react-icons/io5';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <div className="w-full h-full p-20 bg-slate-600">
        {/* user 정보 */}
        <h1 className="pt-24 text-center tex text-5xl">회원정보</h1>
        <div className="p-24">
          <div className="flex flex-col gap-1 mb-20">
            <p className="text-2xl">이메일 입니다.</p>
            <p className="text-2xl">닉네임 입니다.</p>
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
              <h3>제목입니다.</h3>
              <p>시간입니다.</p>
            </div>
            <p className="text-2xl">내용</p>
          </div>
        </div>
      </div>
    </>
  );
}
