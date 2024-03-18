'use client';
import { app } from '@/api/fiebaseApi';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { FormEvent } from 'react';

type join = {
  email: string;
  password: string;
  nickname: string;
};

const Join = () => {
  const onJoinSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const nickname = formData.get('nickname') as string;

    if (validation({ email, password, nickname })) {
      try {
        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입에 성공했습니다.');
      } catch (error: any) {
        alert('중복된 아이디 입니다.');
      }
    }
  };
  return (
    <>
      <form onSubmit={onJoinSubmitEventHandler}>
        <input type="email" name="email" required placeholder="이메일를 입력해주세요"></input>
        <input type="password" name="password" required placeholder="비밀번호를 입력해주세요"></input>
        <input type="text" name="nickname" required placeholder="닉네임을 입력해주세요"></input>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Join;

const validation = ({ email, password, nickname }: join) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!email.match(validRegex)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (password.length < 5) {
    alert('비밀번호는 8자리 이상 입력해주세요.');
    return false;
  }

  if (nickname.length < 3) {
    alert('닉네임은 8자리 이상 입력해주세요.');
    return false;
  }

  return true;
};
