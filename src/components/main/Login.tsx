'use Client';

import { app, database } from '@/api/fiebaseApi';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { FormEvent, useEffect, useState } from 'react';
// 로그인 및 회원가입 분리 이유
// 이후 home.tsx에서 두개의 토글을 생성하여
// 각각 로그인 버튼 및 회원가입 버튼 클릭 시 모달창 띄우기 위해 분리하였다.

//사용자 로그인 창 관리자 로그인창 동일
// 관리자일 경우 로그아웃 버튼 옆 톱니바퀴 이모티콘? 버튼 생성

// dasiy 플러그인 삭제
// yarn add react-toastify 설치
interface User {
  uid: string;
}

const Login = () => {
  const auth = getAuth(app);

  //전역으로 관리해야하는 이유
  //user에 대한 정보를 어디서 사용할까요
  const [userState, setUserState] = useState();

  const [isAdmins, setIsAdmins] = useState(false);

  useEffect(() => {
    onUserStateChange((user: any) => {
      setUserState(user);
    });
  }, [userState]);

  //로그인 상태 변경 시마다 호출
  function onUserStateChange(call: any) {
    //로그인된 정보 읽기
    onAuthStateChanged(auth, async (user) => {
      //로그인된 유저가 관리자인지 사용자인지를 확인 or 비로그인 상태인지를 확인
      const updatedUser = user ? await admins(user) : null;
      call(updatedUser);
    });
  }

  // 사용자 및 관리자 여부 확인
  //true: 관리자, false: 사용자
  const admins = async (user: User) => {
    try {
      //RealTimeDataBase에 저장되어 있는 관리자의 정보 가져오기
      const checkRef = await get(ref(database, 'admins'));
      if (checkRef.exists()) {
        const admins = checkRef.val();
        const isAdmins = admins.includes(user.uid);
        setIsAdmins(isAdmins);

        return { ...user, isAdmins };
      }
      return user;
    } catch (error) {
      alert('에러발생했습니다.');
    }
  };

  const onLoginSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    //유효성 검사
    if (validation({ email, password })) {
      login({ auth, email, password });
    }
  };

  return (
    <>
      {auth.currentUser ? (
        // 로그인 되었을 경우

        <button onClick={() => signOut(auth)}>로그아웃</button>
      ) : (
        //비로그인일 경우
        <form onSubmit={onLoginSubmitEventHandler}>
          <button type="submit">로그인</button>
          아이디: <input type="email" name="email" required placeholder="아이디 입력"></input>
          비밀번호: <input type="password" name="password" required placeholder="비밀번호 입력"></input>
          회원가입
        </form>
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

//로그인
const login = async ({ auth, email, password }: { auth: Auth; email: string; password: string }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('로그인에 성공했습니다');
  } catch (error: any) {
    alert('해당 로그인 정보가 없습니다.');
  }
};
