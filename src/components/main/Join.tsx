'use client';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { app, db } from '@/api/fiebaseApi';
import { User, createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { useAppDispatch, useAppSelector } from '@/utill/hooks/redux/useRedux';
import { joinModalAction, joinState } from '@/store/modules/isModalToggle';

import { setUserJoin, userValidate } from '@/types/user-type';
import { FaUserAstronaut } from 'react-icons/fa';
import useInput from '@/utill/hooks/input/useInput';

const Join = () => {
  const auth = getAuth(app);

  //"중복확인" 버튼 클릭 여부
  const [isIdCheck, setIsIdCheck] = useState(false);
  //회원가입 모달창 Toggle
  const dispatch = useAppDispatch();
  const isJoinToggle = useAppSelector(joinState);
  //useInput hooks
  const { value, onChangeHandler, reset } = useInput({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: ''
  });

  const { email, password, passwordCheck, nickname } = value;

  //회원가입 기능
  const onJoinSubmitEventHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유효성 검사
    if (validation({ email, password, passwordCheck, nickname, isIdCheck })) {
      try {
        // auth 저장
        const userCreate = await createUserWithEmailAndPassword(auth, email, password);
        const user = await userCreate.user;
        await updateProfile(user, {
          displayName: nickname
        });

        const userId = auth.currentUser?.uid;

        //firebase 저장
        setDatabase({ userId, email, password, nickname });

        toast.success('회원가입에 성공했습니다.');
        dispatch(joinModalAction(false));
        reset();
      } catch (error) {
        toast.error('중복된 아이디입니다.');
      }
    }
  };

  //중복 확인
  const onIdCheckEventHandler = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data()
      }));

      setIsIdCheck(idValidation({ users, email }));
    } catch (error) {
      console.log('중복확인 기능에서 발생', error);
    }
  };

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
                value={nickname}
                onChange={onChangeHandler}
                required
                placeholder="닉네임을 입력해주세요"
              ></input>
              <div className="w-full flex gap-5">
                <input
                  className="p-1 w-full border-b border-slate-300 mb-3"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
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
                value={password}
                required
                onChange={onChangeHandler}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="new-password"
              ></input>
              <input
                className="p-1 w-full border-b border-slate-300 mb-3"
                type="password"
                name="passwordCheck"
                required
                value={passwordCheck}
                onChange={onChangeHandler}
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
          className={`cursor-pointer hover:text-slate-300  ${'body' + (isJoinToggle ? 'active' : '')}`}
          onClick={() => dispatch(joinModalAction(true))}
        >
          <div className="flex flex-row ml-3">
            <FaUserAstronaut className="text-2xl ml-1 mr-1" />
            회원가입
          </div>
        </button>
      )}
    </>
  );
};

export default Join;

//유효성 검사
const validation = ({ password, passwordCheck, nickname, isIdCheck }: userValidate) => {
  if (password.length < 6) {
    toast.error('비밀번호는 6자리 이상 입력해주세요.');
    return false;
  }

  if (nickname.length < 3) {
    toast.error('닉네임은 3자리 이상 입력해주세요.');
    return false;
  }

  if (password !== passwordCheck) {
    toast.error('비밀번호가 일치하지 않습니다.');
    return false;
  }
  if (isIdCheck === false) {
    toast.error('중복확인을 클릭해주세요');
    return false;
  }

  return true;
};

const idValidation = ({ users, email }: { users: any; email: string }) => {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_'{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;

  const isIdCheck = users?.find((item: User) => (item.email == email ? true : false));

  if (email === '') {
    toast.error('아이디를 입력해주세요');
    return false;
  }

  if (!email.match(validRegex)) {
    toast.error('이메일 형식이 올바르지 않습니다.');
    return false;
  }

  if (isIdCheck) {
    toast.error('존재하는 아이디입니다.');
    return false;
  } else {
    toast.success('사용가능한 아이디입니다.');
    return true;
  }
};

//FireStore에 저장
const setDatabase = async ({ userId, email, password, nickname }: setUserJoin): Promise<void> => {
  //여기에 선언한 이유
  //fireAuth에 저장한 후 ==> auth에 저장된 uid값을 불러와야한다.

  const createdAt = new Date().toLocaleString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const newUser = {
    userId,
    email,
    password,
    nickname,
    createdAt
  };

  await addDoc(collection(db, 'user'), newUser);
};
