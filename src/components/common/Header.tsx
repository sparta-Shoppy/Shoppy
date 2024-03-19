'use client';
import { app } from '@/api/fiebaseApi';
import { getAuth, signOut } from 'firebase/auth';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Join from '../main/Join';
import Login from '../main/Login';

import { delCookie } from '@/api/cookies';
import { onUserStateChange } from '@/api/login';

import { useAppDispatch } from '@/hooks/useRedux';
import { userAction } from '@/store/modules/user';

const Header = () => {
  const auth = getAuth(app);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    onUserStateChange(auth, (user: any) => {
      if (user) {
        setIsAdmin(user.isAdmins ?? false);
        setIsUser(true);
        dispatch(userAction(user.uid));
      } else {
        setIsAdmin(false); //1) false로 준 이유?
      }
    });
  }, []);

  //로그아웃 기능
  const onLogOutClickEventHandler = () => {
    signOut(auth);
    delCookie('user');
    delCookie('admin');

    setIsUser(false);
  };

  return (
    <>
      <div className="flex items-center m-auto w-11/12  justify-between">
        <Link href={'/'}>
          <img src="assets/logo.png" alt="logo" className="mt-2 w-24" />
        </Link>
        {/*로그인된 상태*/}
        {isUser ? (
          <div className="flex flex-row">
            <button onClick={onLogOutClickEventHandler} className="text-xl">
              로그아웃
            </button>
            {/* 관리자 상태 */}
            {isAdmin && (
              <Link href={'/admin'}>
                <h1 className="ml-4 text-xl">관리자창</h1>
              </Link>
            )}
          </div>
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
