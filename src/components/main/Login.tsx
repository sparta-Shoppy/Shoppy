'use Client';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

import { app, db } from '@/api/fiebaseApi';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { loginModalAction, loginState } from '@/store/modules/isModalToggle';

import { setUserLogin } from '@/types/user-type';
import { useAppDispatch, useAppSelector } from '@/utill/hooks/redux/useRedux';
import { FaUserCheck } from 'react-icons/fa';
import gitIcon from '../../../public/assets/logo.png';
import { IoLogoGithub } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { SiCoinmarketcap } from 'react-icons/si';

const Login = () => {
  const auth = getAuth(app);
  const collectionRef = collection(db, 'user');

  //로그인 모달창 Toggle
  const dispatch = useAppDispatch();
  const isLoginToggle = useAppSelector(loginState);

  const onLoginSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    //유효성 검사 후 firebase에서 제공하는 함수 실행
    if (validation({ email, password })) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('로그인에 성공하였습니다.');
        (e.target as HTMLFormElement).reset();
        dispatch(loginModalAction(false));
      } catch (error: any) {
        toast.error('아이디와 비밀번호를 확인해주세요');
      }
    }
  };

  // 구글 로그인 버튼
  const onGoogleLoginHandler = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const googleResult = await signInWithPopup(auth, googleProvider);
      const googleUser = googleResult.user;
      const { uid, displayName, email } = googleUser;

      setDatabase({ uid, displayName, email });
    } catch (error) {
      toast.error('이미 있는 이메일 입니다!');
      console.log('google error', error);
    }
  };

  // 깃허브 로그인 버튼
  const onGitHubLoginHandler = async () => {
    try {
      const gitHubProvider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, gitHubProvider);
      const user = result.user;
      const newData = {
        nickname: user.displayName,
        email: user.email,
        user_img: user.photoURL,
        user_id: user.uid
      };

      const docRef = doc(collectionRef, user.uid);
      await setDoc(docRef, newData);
      // navigate('/');
    } catch (error) {
      toast.error('이미 있는 이메일 입니다!');
      console.log(error);
    }
  };

  return (
    <>
      {/*true: 로그인 모달창 띄우기 */}
      {isLoginToggle ? (
        <div className="fixed w-full h-screen inset-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white  w-3/5 flex flex-col items-center rounded-md pb-10">
            <div className="w-full flex-col justify-end  p-8">
              <p className="flex justify-end">
                <span
                  className="inline-block text-right bt cursor-pointer"
                  onClick={() => dispatch(loginModalAction(false))}
                >
                  닫기
                </span>
              </p>

              <h2 className=" p-2 flex justify-center">Login</h2>
            </div>

            <form
              className="w-3/5 flex flex-col gap-7 items-center justify-center "
              onSubmit={onLoginSubmitEventHandler}
            >
              <div className="w-full flex gap-5">
                <input
                  className="p-1 w-full border-b border-slate-300 mb-3"
                  type="email"
                  name="email"
                  required
                  placeholder="이메일를 입력해주세요"
                  autoComplete="username"
                ></input>
              </div>
              <input
                className="p-1 w-full border-b border-slate-300 mb-3"
                type="password"
                name="password"
                required
                placeholder="비밀번호를 입력해주세요"
                autoComplete="new-password"
              ></input>

              <div className="flex items-center gap-3">
                <SiCoinmarketcap className="text-4xl" />
                <button type="submit" className="w-52 bg-slate-200 p-1 rounded-md hover:bg-white ">
                  로그인
                </button>
              </div>
              <div className="flex items-center gap-3">
                <FcGoogle className="text-4xl " />
                <button
                  type="button"
                  onClick={onGoogleLoginHandler}
                  className="w-52 bg-slate-200 p-1 rounded-md hover:bg-white "
                >
                  구글
                </button>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <IoLogoGithub className="text-4xl" />
                <button
                  type="button"
                  onClick={onGitHubLoginHandler}
                  className="w-52 bg-slate-200 p-1 rounded-md hover:bg-white "
                >
                  깃허브
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // false일 경우 로그인 버튼만 등장
        <button className="cursor-pointer hover:text-slate-300 " onClick={() => dispatch(loginModalAction(true))}>
          <div className="flex flex-row ml-3">
            로그인
            <FaUserCheck className="text-2xl ml-1 mr-1" />
          </div>
        </button>
      )}
    </>
  );
};

export default Login;

//유효성 검사
const validation = ({ email, password }: { email: string; password: string }) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

  if (!email.match(validRegex)) {
    toast.error('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (password?.length < 6) {
    toast.error('비밀번호는 6자리 이상 입력해주세요.');
    return false;
  }

  return true;
};

const setDatabase = async ({ uid, displayName, email }: setUserLogin): Promise<void> => {
  const collectionRef = collection(db, 'user');
  const createdAt = new Date().toLocaleString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const newData = {
    userId: uid,
    nickname: displayName,
    email,
    createdAt
  };

  const docRef = doc(collectionRef, uid);
  await setDoc(docRef, newData);
};
