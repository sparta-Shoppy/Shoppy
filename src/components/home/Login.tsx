'use Client';

import { app } from '@/api/fiebaseApi';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent } from 'react';
// 로그인 및 회원가입 분리 이유
// 이후 home.tsx에서 두개의 토글을 생성하여
// 각각 로그인 버튼 및 회원가입 버튼 클릭 시 모달창 띄우기 위해 분리하였다.

type login = {
  email: string;
  password: string;
};

const Login = () => {
  const onLoginSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (validation({ email, password })) {
      try {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password);
        alert('로그인에 성공했습니다');
      } catch (error: any) {
        alert('해당 로그인 정보가 없습니다.');
      }
    }
  };

  return (
    <>
      <form onSubmit={onLoginSubmitEventHandler}>
        <input type="email" name="email" required placeholder="아이디 입력"></input>
        <button type="submit">로그인</button>
        <input type="password" name="password" required placeholder="비밀번호 입력"></input>
      </form>
    </>
  );
};

export default Login;

const validation = ({ email, password }: login) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!email?.match(validRegex)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (password?.length < 8) {
    alert('비밀번호는 8자리 이상 입력해주세요.');
    return false;
  }

  return true;
};
