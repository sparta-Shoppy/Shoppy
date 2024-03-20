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
        dispatch(userAdmin(true));
      } else {
        setIsAdmin(false); //1) false로 준 이유?
        dispatch(userAdmin(false));
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
