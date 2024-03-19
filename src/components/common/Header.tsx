'use client';

import { app } from '@/api/fiebaseApi';
import { onUserStateChange } from '@/api/login';
import { Auth, getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Login from '../main/Login';
import Join from '../main/Join';

const Header = () => {
  // 전역으로 로그인 정보를 관리
  const [userState, setUserState] = useState<Auth>();

  const auth = getAuth(app);

  useEffect(() => {
    //user(로그인 및 로그아웃)의 상태 변화 시에 작동
    onUserStateChange(auth, (user: any) => {
      //전역 관리
      //필요한 페이지에서 불러온다.
      setUserState(user);
      console.log('됩니다.');
    });
  }, []);

  //로그아웃 버튼 기능
  const onLogOutClickEventHandler = () => {
    //로컬 스토리지 데이터 삭제
    window.localStorage.removeItem('user');
    //현재 접속된 user 로그아웃
    signOut(auth);
  };

  return (
    <>
      <div className="flex m-auto w-11/12  justify-between">
        <div className="">
          <img src="assets/logo.png" alt="logo" className="w-3/6 mt-2" />
        </div>
        {/*로그인된 상태*/}
        {auth.currentUser ? (
          <button onClick={onLogOutClickEventHandler}>로그아웃</button>
        ) : (
          //  비로그인 상태
          <div className="w-72 flex justify-evenly items-center text-l">
            <Join />
            <Login />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
