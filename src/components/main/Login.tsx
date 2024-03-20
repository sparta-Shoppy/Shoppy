'use Client';

import { app } from '@/api/fiebaseApi';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { loginModalAction, loginState } from '@/store/modules/isModalToggle';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const auth = getAuth(app);

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
        toast.error(error.code);
      }
    }
  };

  return (
    <>
      {/* // true: 로그인 모달창 띄우기 */}
      {isLoginToggle ? (
        <form onSubmit={onLoginSubmitEventHandler}>
          아이디: <input type="email" name="email" required placeholder="아이디 입력"></input>
          비밀번호: <input type="password" name="password" required placeholder="비밀번호 입력"></input>
          <button type="submit"> 로그인 버튼 </button>
        </form>
      ) : (
        // false일 경우 로그인 버튼만 등장
        <button
          className="cursor-pointer hover:text-slate-300 font-bold"
          onClick={() => dispatch(loginModalAction(true))}
        >
          로그인
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
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (password?.length < 6) {
    alert('비밀번호는 5자리 이상 입력해주세요.');
    return false;
  }

  return true;
};
