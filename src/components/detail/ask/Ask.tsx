'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../api/fiebaseApi';
import { NewAskType } from '@/types/product-type';
import { toast } from 'react-toastify';
import { GrCheckbox } from 'react-icons/gr';
import { FiCheckSquare } from 'react-icons/fi';
import { HiLockClosed } from 'react-icons/hi2';
import { isAdminState, nicknameState, userState } from '@/store/modules/user';
import useAskInput from '@/utill/hooks/detail/useAskInput';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';

function Ask() {
  const [nowId, setNowId] = useState<string>('');
  const [askSecret, setAskSecret] = useState<boolean>(false);
  const [changeNow, setChangeNow] = useState<boolean>(false);
  const [adminChangeNow, setAdminChangeNow] = useState<boolean>(false);
  const [ask, setAsk] = useState<NewAskType[]>();

  const params = useParams();
  const userUid = useAppSelector(userState);
  const adminNow = useAppSelector(isAdminState);
  const nickname = useAppSelector(nicknameState);

  console.log('adminNow', adminNow);

  const { value, onChangeHandler, reset, dataLoad, adminDataLoad } = useAskInput({
    content: '',
    changeContent: '',
    adminContent: ''
  });

  const { content, changeContent, adminContent } = value;

  // 작성
  const askSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAsk = {
      writerId: userUid,
      content,
      nickname,
      createdAt: new Date().toLocaleString('ko', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      productId: params.id,
      secret: askSecret,
      answer: '답변이 아직 없습니다.'
    };
    try {
      await addDoc(collection(db, 'ask'), newAsk);
      toast.success('후기 등록 완료!');
      reset();
      setAskSecret(false);
    } catch (error) {
      toast.error('후기 등록 실패');
    }
  };

  // 삭제
  const askDelete = async (askId: string) => {
    const real = window.confirm('삭제하시겠습니까?');
    if (real) {
      try {
        const askRef = doc(db, 'ask', askId);
        await deleteDoc(askRef);
        setAsk((prev) => {
          return prev?.filter((element) => element.askId !== askId);
        });
        toast.success('삭제가 되었습니다.');
      } catch (error) {
        toast.error('삭제 실패!');
      }
    } else {
      return;
    }
  };

  // 수정완료 불러오기
  const askChangeBtn = (prev: NewAskType) => {
    setChangeNow(true);
    setNowId(prev.askId);
    dataLoad(prev.content);
  };

  // 수정취소
  const askChangeCancel = () => {
    setChangeNow(false);
    setNowId('');
  };

  // 수정
  const askChange = async (prev: NewAskType) => {
    const askRef = doc(db, 'ask', prev.askId);
    if (changeContent === prev.content) {
      toast.warning('수정된 게 없어요!');
      return;
    } else {
      const real = window.confirm('수정하시겠습니까?');
      if (real) {
        try {
          await updateDoc(askRef, { ...prev, content: changeContent });
          setAsk((item) => {
            return item?.map((element) => {
              if (element.askId === prev.askId) {
                return { ...element, content: changeContent };
              } else {
                return element;
              }
            });
          });
          setChangeNow(false);
          toast.success('수정 완료!');
        } catch (error) {
          toast.error('수정 실패!');
        }
      }
    }
  };

  const adminAnswer = async (prev: NewAskType) => {
    const askRef = doc(db, 'ask', prev.askId);
    if (adminContent === prev.answer) {
      toast.warning('바뀐 게 없어요!');
      return;
    } else {
      const real = window.confirm('작성하시겠습니까?');
      if (real) {
        try {
          await updateDoc(askRef, { ...prev, answer: adminContent });
          setAdminChangeNow(!adminChangeNow);
          setAsk((item) => {
            return item?.map((element) => {
              if (element.askId === prev.askId) {
                return { ...element, answer: adminContent };
              } else {
                return element;
              }
            });
          });
          toast.success('수정 완료!');
        } catch (error) {
          toast.error('수정 실패!');
        }
      }
    }
  };

  // 답변 완료버튼 불러오기
  const adminChangeBtn = (prev: NewAskType) => {
    setAdminChangeNow(!adminChangeNow);
    adminDataLoad(prev.answer);
    setNowId(prev.askId);
  };

  // 관리자 답변 취소
  const adminContentCancel = () => {
    setAdminChangeNow(!adminChangeNow);
    setNowId('');
  };

  // 후기 작성글 불러오기
  useEffect(() => {
    const fetchCommentData = async () => {
      const askDB = query(collection(db, 'ask'), where('productId', '==', params.id), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(askDB);

      const initialData: any = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ askId: doc.id, ...doc.data() });
      });

      setAsk([...initialData]);
    };

    fetchCommentData();
  }, [content]);

  return (
    <div className="flex flex-col  items-center">
      <form onSubmit={askSubmit} className="w-2/6 flex flex-col gap-2">
        <div className="w-full flex items-start gap-5">
          <input
            type="text"
            name="content"
            value={content}
            onChange={onChangeHandler}
            placeholder="내용을 입력해 주세요"
            maxLength={20}
            required
            className="w-4/5 border rounded-md p-1 ml-2"
          />
          <button type="submit" className="w-28 p-1 bg-white hover:bg-gray-100 text-gray-800 border rounded">
            등록
          </button>
        </div>

        <div className="w-full flex">
          <label htmlFor="secretCheck" className="flex gap-2">
            <input
              id="secretCheck"
              type="checkbox"
              checked={askSecret}
              onChange={(e) => {
                setAskSecret(e.target.checked);
              }}
            />
            비밀 글 등록
          </label>
        </div>
      </form>

      <div>
        {ask?.map((prev) => {
          return (
            <div className="m-4" key={prev.askId}>
              <div className="flex gap-1">
                <span>{prev.nickname}</span>
                <span className="text-xs text-gray-400 mt-1.5">{prev.createdAt}</span>
                {prev.answer === '답변이 아직 없습니다.' ? (
                  <GrCheckbox className="mt-1.5" />
                ) : (
                  <FiCheckSquare className="mt-1.5" />
                )}
              </div>
              <div className="flex justify-between items-center p-2">
                {changeNow && nowId === prev.askId ? (
                  <input
                    type="text"
                    required
                    maxLength={20}
                    name="changeContent"
                    value={changeContent}
                    onChange={onChangeHandler}
                    className="admin__input-field"
                  />
                ) : prev.secret && userUid !== prev.writerId && !adminNow ? (
                  <>
                    비밀글입니다. <HiLockClosed />
                  </>
                ) : (
                  <div className="text-3xl">{prev.content}</div>
                )}
                {userUid === prev.writerId ? (
                  <div className="flex gap-2">
                    {changeNow && nowId === prev.askId ? (
                      <>
                        <button className="review__button-field" onClick={() => askChange(prev)}>
                          수정완료
                        </button>
                        <button className="review__button-field" onClick={askChangeCancel}>
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="review__button-field" onClick={() => askChangeBtn(prev)}>
                          수정
                        </button>
                        <button className="review__button-field" onClick={() => askDelete(prev.askId)}>
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex justify-between items-center p-2">
                {adminChangeNow && nowId === prev.askId ? (
                  <>
                    <input
                      className="admin__input-field"
                      type="text"
                      required
                      maxLength={20}
                      name="adminContent"
                      value={adminContent}
                      onChange={onChangeHandler}
                    />
                  </>
                ) : !prev.secret || adminNow || userUid === prev.writerId ? (
                  <div className="text-3xl">{prev.answer}</div>
                ) : (
                  <></>
                )}
                {adminNow ? (
                  <div className="flex gap-2">
                    {adminChangeNow && nowId === prev.askId ? (
                      <>
                        <button className="review__button-field" onClick={() => adminAnswer(prev)}>
                          완료
                        </button>
                        <button className="review__button-field" onClick={adminContentCancel}>
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="review__button-field" onClick={() => adminChangeBtn(prev)}>
                          답변작성
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ask;
