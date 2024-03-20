'use client';

import { app, db } from '@/api/fiebaseApi';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { joinModalAction, joinState } from '@/store/modules/isModalToggle';
import { NewUserType } from '@/types/product-type';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { query } from 'firebase/database';
import { addDoc, collection, getDocs, where } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

const Join = () => {
  const auth = getAuth(app);

  //회원가입 모달창 Toggle
  const dispatch = useAppDispatch();
  const isJoinToggle = useAppSelector(joinState);

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
        dispatch(joinModalAction(false));
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
      createdAt
    };

    await addDoc(collection(db, 'user'), newUser);
  };

  //중복 확인 기능
  // const onIdCheckEventHandler = async () => {
  //   try {
  //     // const q = query(collection(db, 'user'), where('email', '==', true));

  //     const fetchedProducts: any = [];
  //     querySnapshot.forEach((doc) => {
  //       const user = doc.data();
  //       console.log('user', user);
  //       // fetchedProducts.push({ ...products, id: doc.id, products });
  //     });
  //     console.log('fetchedProducts', fetchedProducts);
  //     if (fetchedProducts.length != null) {
  //     }
  //     // setProducts(fetchedProducts);
  //   } catch (error) {
  //     console.log('상품 데이터 가져오기 실패', error);
  //   }
  // };

  return (
    <>
      {/* // true: 회원가입 모달창 띄우기 */}
      {isJoinToggle ? (
        <div className="fixed w-full h-screen inset-0 flex flex-col justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white  w-3/5 flex flex-col items-center rounded-md pb-10">
            <div className="w-full flex-col justify-end  p-8">
              <p className="flex justify-end">
                <span
                  className="inline-block text-right bt cursor-pointer"
                  onClick={() => dispatch(joinModalAction(false))}
                >
                  닫기
                </span>
              </p>

              <h2 className=" p-2 flex justify-center">Join</h2>
            </div>

            <form
              className="w-3/5 flex flex-col gap-7 items-center justify-center "
              onSubmit={onJoinSubmitEventHandler}
            >
              <input
                className="p-1 w-full border-b border-slate-300 mb-3"
                type="text"
                name="nickname"
                required
                placeholder="닉네임을 입력해주세요"
              ></input>
              <div className="w-full flex gap-5">
                <input
                  className="p-1 w-full border-b border-slate-300 mb-3"
                  type="email"
                  name="email"
                  required
                  placeholder="이메일를 입력해주세요"
                  autoComplete="username"
                ></input>
                <button type="button" className="w-32 bg-slate-200 p-1 rounded-md mb-3" onClick={onIdCheckEventHandler}>
                  중복확인
                </button>
              </div>
              <input
                className="p-1 w-full border-b border-slate-300 mb-3"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                autoComplete="new-password"
              ></input>
              <input
                className="p-1 w-full border-b border-slate-300 mb-3"
                type="password"
                name="password"
                placeholder="비밀번호 확인"
                autoComplete="new-password"
              ></input>

              <button type="submit" className="w-52 bg-slate-200 p-1 rounded-md hover:bg-white mt-8">
                회원가입
              </button>
            </form>
          </div>
        </div>
      ) : (
        // false일 경우 회원가입 버튼만 등장
        <button
          className={`cursor-pointer hover:text-slate-300 font-bold ${'body' + (isJoinToggle ? 'active' : '')}`}
          onClick={() => dispatch(joinModalAction(true))}
        >
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
