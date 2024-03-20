'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../api/fiebaseApi';
import { NewAskType } from '@/types/product-type';
import { toast } from 'react-toastify';
import { HiLockClosed } from 'react-icons/hi2';
import { useAppSelector } from '@/hooks/useRedux';

function Ask() {
  const [content, setContent] = useState<string>('');
  const [changeContent, setChangeContent] = useState<string>('');
  const [nowId, setNowId] = useState<string>('');
  const [askSecret, setAskSecret] = useState<boolean>(false);
  const [changeNow, setChangeNow] = useState<boolean>(false);
  const [ask, setAsk] = useState<NewAskType[]>();

  const params = useParams();
  const uid = useAppSelector((state) => state.user.value);
  const loginNow: any = uid;
  // 작성
  const askSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAsk = {
      writerId: uid,
      content,
      createdAt: new Date().toLocaleString('ko', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      productId: params.id,
      secret: askSecret
    };
    try {
      await addDoc(collection(db, 'ask'), newAsk);
      toast.success('후기 등록 완료!');
      setContent('');
      setAskSecret(false);
    } catch (error) {
      toast.error('후기 등록 실패');
    }
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
    setChangeContent(prev.content);
  };

  // 수정취소
  const askChangeCancel = () => {
    setChangeNow(false);
    setChangeContent('');
    setNowId('');
  };

  // 수정된 input 값
  const askChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeContent(e.target.value);
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
          setChangeContent('');
          setChangeNow(false);
          setAsk((item) => {
            return item?.map((element) => {
              if (element.askId === prev.askId) {
                return { ...element, content: changeContent };
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

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={askSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value);
          }}
          placeholder="내용을 입력해 주세요"
          maxLength={20}
          required
          className="admin__input-field"
        />

        <label htmlFor="secretCheck">
          <input
            id="secretCheck"
            type="checkbox"
            checked={askSecret}
            onChange={(e) => {
              setAskSecret(e.target.checked);
            }}
          />
          비밀 글
        </label>

        <button
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          등록
        </button>
      </form>

      <div>
        {ask?.map((prev) => {
          return (
            <div className="m-4" key={prev.askId}>
              <div>
                <span className="text-xl font-bold mr-2">{prev.writerId}</span>
                <span className="text-sm text-gray-400">{prev.createdAt}</span>
              </div>
              <div className="flex justify-between items-center p-2">
                {changeNow && nowId === prev.askId ? (
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={changeContent}
                    onChange={askChangeInput}
                    className="admin__input-field"
                  />
                ) : prev.secret && loginNow !== uid ? (
                  <>
                    비밀글입니다. <HiLockClosed />
                  </>
                ) : (
                  <div className="text-3xl">{prev.content}</div>
                )}
                {loginNow === prev.writerId ? (
                  <div className="flex gap-2">
                    {changeNow && nowId === prev.askId ? (
                      <>
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={() => askChange(prev)}
                        >
                          수정완료
                        </button>
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={askChangeCancel}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={() => askChangeBtn(prev)}
                        >
                          수정
                        </button>
                        <button
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={() => askDelete(prev.askId)}
                        >
                          삭제
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
