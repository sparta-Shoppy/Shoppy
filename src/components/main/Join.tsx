'use client';

import { app, db } from '@/api/fiebaseApi';
import { NewUserType } from '@/types/product-type';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const Join = () => {
  const auth = getAuth(app);
  //회원가입 모달창 Toggle
  const [isJoinToggle, setIsJoinToggle] = useState(false);
  const createdAt = new Date().toLocaleString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  //회원가입 기능
  const onJoinSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    //input태그의 값
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const nickname = formData.get('nickname') as string;

    //유효성 검사
    if (validation({ email, password, nickname })) {
      try {
        // auth 저장
        await createUserWithEmailAndPassword(auth, email, password);

        //firebase 저장
        setDatabase({ email, password, nickname });

        toast.success('회원가입에 성공했습니다.');
        setIsJoinToggle(false);
        (e.target as HTMLFormElement).reset();
      } catch (error: any) {
        toast.success('중복된 아이디 입니다.');
      }
    }
  };

  const setDatabase = async ({ email, password, nickname }: NewUserType) => {
    const userId = auth.currentUser?.uid;
    const newUser = {
      userId,
      email,
      password,
      nickname,
      cart: [],
      createdAt
    };

    await addDoc(collection(db, 'user'), newUser);
  };

  return (
    <>
      {/* // true: 회원가입 모달창 띄우기 */}
      {isJoinToggle ? (
        <form onSubmit={onJoinSubmitEventHandler}>
          <input type="email" name="email" required placeholder="이메일를 입력해주세요"></input>
          <input type="password" name="password" required placeholder="비밀번호를 입력해주세요"></input>
          <input type="text" name="nickname" required placeholder="닉네임을 입력해주세요"></input>
          <button type="submit">회원가입</button>
        </form>
      ) : (
        // false일 경우 회원가입 버튼만 등장
        <button className="cursor-pointer hover:text-slate-300 font-bold" onClick={() => setIsJoinToggle(true)}>
          회원가입
        </button>
      )}
    </>
  );
};

export default Join;

const validation = ({ email, password, nickname }: NewUserType) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!email.match(validRegex)) {
    alert('이메일 형식이 올바르지 않습니다.');
    return false;
  }
  if (password.length < 6) {
    alert('비밀번호는 6자리 이상 입력해주세요.');
    return false;
  }

  if (nickname.length < 3) {
    alert('닉네임은 3자리 이상 입력해주세요.');
    return false;
  }

  return true;
};
