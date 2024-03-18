'use Client';

import { FormEvent } from 'react';

// 로그인 및 회원가입 분리 이유
// 이후 home.tsx에서 두개의 토글을 생성하여
// 각각 로그인 버튼 및 회원가입 버튼 클릭 시 모달창 띄우기 위해 분리하였다.

const Login = () => {
  const onLoginSubmitEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const id = formData.get('id') as string;
    const password = formData.get('password') as string;
  };

  return (
    <>
      <form onSubmit={onLoginSubmitEventHandler}>
        <input type="text" name="id"></input>
        <input type="password" name="password"></input>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
