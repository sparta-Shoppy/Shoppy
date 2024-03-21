'use client';

import { app } from '@/api/fiebaseApi';
import { getAuth, signOut } from 'firebase/auth';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Join from '../main/Join';
import Login from '../main/Login';

import { onUserStateChange } from '@/api/login';

import { deleteAdminCookie } from '@/api/cookie';
import { useAppDispatch } from '@/hooks/useRedux';
import { userAction, userAdmin } from '@/store/modules/user';
import { useRouter } from 'next/navigation';

import { TiShoppingCart } from 'react-icons/ti';
import { FaUserMinus } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { userId } from '@/api/user';
import { cookies } from 'next/headers';

const Header = () => {
  const auth = getAuth(app);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const router = useRouter();
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

  useEffect(() => {
    dispatch(userAdmin(isAdmin));
  }, [isAdmin]);

  //로그아웃 기능
  const onLogOutClickEventHandler = () => {
    signOut(auth);
    deleteAdminCookie();

    router.replace('/');
    setIsUser(false);
  };

  return (
    <>
      <div className="flex items-center m-auto w-11/12  justify-between">
        <Link href={'/'}>
          <img
            src="https://github.com/sparta-Shoppy/Shoppy/blob/dev/public/assets/logo.png?raw=true"
            alt="logo"
            className="mt-2 w-24"
          />
        </Link>
        {/*로그인된 상태*/}
        {isUser ? (
          <div className="flex flex-row">
            <Link href={`/cart/${userId}`} className="text-xl">
              <div className="flex flex-row">
                장바구니
                <TiShoppingCart className="text-2xl ml-1 mr-1" />
              </div>
            </Link>
            <button onClick={onLogOutClickEventHandler} className="ml-4 text-xl">
              <div className="flex flex-row">
                로그아웃
                <FaUserMinus className="text-2xl ml-1 mr-1" />
              </div>
            </button>
            {/* 관리자 상태 */}{' '}
            {isAdmin && (
              <Link href={'/admin'} className="text-xl">
                <div className="flex flex-row ml-3">
                  관리자창
                  <FaUserCog className="text-2xl ml-1 mr-1" />
                </div>
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
