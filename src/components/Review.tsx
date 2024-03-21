'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../api/fiebaseApi';
import { NewReviewType } from '@/types/product-type';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useRedux';

function Review() {
  const [content, setContent] = useState<string>('');
  const [changeContent, setChangeContent] = useState<string>('');
  const [nowId, setNowId] = useState<string>('');
  const [changeNow, setChangeNow] = useState<boolean>(false);
  const [review, setReview] = useState<NewReviewType[]>();

  const params = useParams();
  const userUid = useAppSelector((state) => state.user.value);
  const loginNow: any = userUid;

  // 작성
  const reviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      writerId: userUid,
      content,
      createdAt: new Date().toLocaleString('ko', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      productId: params.id
    };
    try {
      await addDoc(collection(db, 'review'), newReview);
      toast.success('후기 등록 완료!');
      setContent('');
    } catch (error) {
      toast.error('후기 등록 실패');
    }
  };

  // 후기 작성글 불러오기
  useEffect(() => {
    const fetchCommentData = async () => {
      const reviewDB = query(
        collection(db, 'review'),
        where('productId', '==', params.id),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(reviewDB);

      const initialData: any = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ reviewId: doc.id, ...doc.data() });
      });

      setReview([...initialData]);
    };

    fetchCommentData();
  }, [content]);

  // 삭제
  const reviewDelete = async (reviewId: string) => {
    const real = window.confirm('삭제하시겠습니까?');
    if (real) {
      try {
        const reviewRef = doc(db, 'review', reviewId);
        await deleteDoc(reviewRef);
        setReview((prev) => {
          return prev?.filter((element) => element.reviewId !== reviewId);
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
  const reviewChangeBtn = (prev: NewReviewType) => {
    setChangeNow(true);
    setNowId(prev.reviewId);
    setChangeContent(prev.content);
  };

  // 수정취소
  const reviewChangeCancel = () => {
    setChangeNow(false);
    setChangeContent('');
    setNowId('');
  };

  // 수정된 input 값
  const reviewChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeContent(e.target.value);
  };

  // 수정
  const reviewChange = async (prev: NewReviewType) => {
    const reviewRef = doc(db, 'review', prev.reviewId);
    if (changeContent === prev.content) {
      toast.warning('수정된 게 없어요!');
      return;
    } else {
      const real = window.confirm('수정하시겠습니까?');
      if (real) {
        try {
          await updateDoc(reviewRef, { ...prev, content: changeContent });
          setChangeContent('');
          setChangeNow(false);
          setReview((item) => {
            return item?.map((element) => {
              if (element.reviewId === prev.reviewId) {
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
      <form onSubmit={reviewSubmit}>
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

        <button type="submit" className="review__button-field">
          등록
        </button>
      </form>

      <div>
        {review?.map((prev) => {
          return (
            <div className="m-4" key={prev.reviewId}>
              <div>
                <span className="text-xl font-bold mr-2">{prev.writerId}</span>
                <span className="text-sm text-gray-400">{prev.createdAt}</span>
              </div>
              <div className="flex justify-between items-center p-2">
                {changeNow && nowId === prev.reviewId ? (
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={changeContent}
                    onChange={reviewChangeInput}
                    className="admin__input-field"
                  />
                ) : (
                  <div className="text-3xl">{prev.content}</div>
                )}
                {loginNow === prev.writerId ? (
                  <div className="flex gap-2">
                    {changeNow && nowId === prev.reviewId ? (
                      <>
                        <button className="review__button-field" onClick={() => reviewChange(prev)}>
                          수정완료
                        </button>
                        <button className="review__button-field" onClick={reviewChangeCancel}>
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="review__button-field" onClick={() => reviewChangeBtn(prev)}>
                          수정
                        </button>
                        <button className="review__button-field" onClick={() => reviewDelete(prev.reviewId)}>
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

export default Review;
