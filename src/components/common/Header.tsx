'use client';

import { app } from '@/api/fiebaseApi';
import { getAuth, signOut } from 'firebase/auth';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Join from '../main/Join';
import Login from '../main/Login';

import { onUserStateChange } from '@/api/login';

import { deleteAdminCookie } from '@/api/cookie';
import { userAction } from '@/store/modules/user';
import { useAppDispatch } from '@/utill/hooks/useRedux';
import { useRouter } from 'next/navigation';

import { userId } from '@/api/user';
import { FaUserCog, FaUserMinus } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

const Header = () => {
  const auth = getAuth(app);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  //로그인 및 비로그인 여부 확인
  useEffect(() => {
    onUserStateChange(auth, (user: any) => {
      if (user) {
        setIsAdmin(user.isAdmins ?? false);
        setIsUser(true);
        dispatch(userAction(user.uid));
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  //로그아웃 기능
  const onLogOutClickEventHandler = () => {
    signOut(auth);
    deleteAdminCookie();

    router.replace('/');
    setIsUser(false);
  };

  return (
    <>
      <header className="flex items-center m-auto w-11/12  justify-between">
        <Link href={'/'}>
          <img src="../../../assets/logo.png" alt="logo" className="mt-2 w-24" />
        </Link>
        {/*로그인된 상태*/}
        {isUser ? (
          <div className="flex flex-row">
            <Link href={`/cart/${userId}`} className="text-xl">
              <div className="flex flex-row hover:text-slate-300 ">
                장바구니
                <TiShoppingCart className="text-2xl ml-1 mr-1" />
              </div>
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
