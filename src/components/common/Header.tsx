'use client';

import { deleteAdminCookie } from '@/api/cookie';
import { app } from '@/api/fiebaseApi';
import { onUserStateChange } from '@/api/login';
import { userAction } from '@/store/modules/user';
import { useAppDispatch } from '@/utill/hooks/useRedux';
import { getAuth, signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Join from '../main/Join';
import Login from '../main/Login';
import { userId } from '@/api/user';
import CartStatus from '../cart/CartStatus';

import { FaUserMinus } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';

//userId 사용
const Header = () => {
  const auth = getAuth(app);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //로그인 및 비로그인 여부 확인
    onUserStateChange(auth, (user: any) => {
      if (user) {
        setIsAdmin(user.isAdmins ?? false);
        setIsUser(true);

        //store에 user 정보 저장
        dispatch(userAction({ userId: user.uid, nickname: user.displayName }));
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  //로그아웃 기능
  const onLogOutClickEventHandler = () => {
    signOut(auth);
    deleteAdminCookie();
    window.localStorage.removeItem('user');

    router.replace('/');
    setIsUser(false);
  };

  console.log('유저아이디', userId);
  return (
    <>
      <header className="flex items-center m-auto w-11/12  justify-between">
        <Link href={'/'}>
          <img
            src="https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/logo.png?raw=true"
            alt="logo"
            className="mt-2 w-24"
          />
        </Link>
        {/*로그인된 상태*/}
        {isUser ? (
          <div className="flex flex-row items-center">
            <Link href={`/cart/${userId}`} className="text-xl">
              <CartStatus />
            </Link>
            <button onClick={onLogOutClickEventHandler} className="ml-4 text-xl">
              <div className="flex flex-row hover:text-slate-300 ">
                로그아웃
                <FaUserMinus className="text-2xl ml-1 mr-1" />
              </div>
            </button>
            {/* 관리자 상태 */}{' '}
            {isAdmin && (
              <Link href={'/admin'} className="text-xl">
                <div className="flex flex-row ml-3 hover:text-slate-300 ">
                  관리자창
                  <FaUserCog className="text-2xl ml-1 mr-1" />
                </div>
              </Link>
            )}
          </div>
        ) : (
          <div className="w-72 flex justify-evenly items-center text-l">
            <Join />
            <Login />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
