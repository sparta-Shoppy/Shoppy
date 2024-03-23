'use client';

import { nicknameState, userState } from '@/store/modules/user';
import { NewReviewType } from '@/types/product-type';
import UseReviewInput from '@/utill/hooks/detail/useReviewInput';
import { useAppSelector } from '@/utill/hooks/redux/useRedux';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { db } from '../../../api/fiebaseApi';
import { itemReviewCreateDate, itemReadReviewData, itemReviewDeleteDate } from '@/utill/hooks/detail/useWrite';

function Review() {
  const [nowId, setNowId] = useState<string>('');
  const [changeNow, setChangeNow] = useState<boolean>(false);
  const [review, setReview] = useState<NewReviewType[]>();

  const params = useParams();
  const userUid = useAppSelector(userState);
  const nickname = useAppSelector(nicknameState);

  const { value, onChangeHandler, reset, dataLoad } = UseReviewInput({
    content: '',
    changeContent: ''
  });

  const { content, changeContent } = value;

  // const { data: review, isLoading, isError, refetch } = itemReadReviewData(params.id);

  // const { createReview } = itemReviewCreateDate();
  // const { deleteId } = itemReviewDeleteDate();

  // 작성
  const reviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      writerId: userUid,
      nickname,
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
      reviewId: crypto.randomUUID()
    };
    try {
      await addDoc(collection(db, 'review'), newReview);
      // createReview({
      //   writerId: userUid,
      //   nickname,
      //   content,
      //   createdAt: new Date().toLocaleString('ko', {
      //     year: '2-digit',
      //     month: '2-digit',
      //     day: '2-digit',
      //     hour: '2-digit',
      //     minute: '2-digit',
      //     hour12: true
      //   }),
      //   productId: params.id,
      //   reviewId: crypto.randomUUID()
      // });
      toast.success('후기 등록 완료!');
      reset();
    } catch (error) {
      toast.error('후기 등록 실패');
    }
  };

  // 삭제
  const reviewDelete = async (reviewUid: string) => {
    const real = window.confirm('삭제하시겠습니까?');
    if (real) {
      try {
        // deleteId(reviewId);
        // refetch();
        const reviewRef = doc(db, 'review', reviewUid);
        await deleteDoc(reviewRef);
        setReview((prev) => {
          return prev?.filter((element) => element.reviewUid !== reviewUid);
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
    setNowId(prev.reviewUid);
    dataLoad(prev.content);
  };

  // 수정취소
  const reviewChangeCancel = () => {
    setChangeNow(false);
    reset();
    setNowId('');
  };

  // 수정
  const reviewChange = async (prev: NewReviewType) => {
    const reviewRef = doc(db, 'review', prev.reviewUid);
    if (changeContent === prev.content) {
      toast.warning('수정된 게 없어요!');
      return;
    } else {
      const real = window.confirm('수정하시겠습니까?');
      if (real) {
        try {
          await updateDoc(reviewRef, { ...prev, content: changeContent });
          setReview((item) => {
            return item?.map((element) => {
              if (element.reviewUid === prev.reviewUid) {
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
        initialData.push({ reviewUid: doc.id, ...doc.data() });
      });

      setReview([...initialData]);
    };

    fetchCommentData();
  }, [content]);

  // // 로딩
  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center">
  //       <div>잠시만 기다려 주세요</div>
  //       <img src="../../../assets/bean.gif" alt="로딩중" />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col justify-center items-center">
      {userUid ? (
        <form onSubmit={reviewSubmit} className="w-full flex justify-center gap-5">
          <input
            type="text"
            name="content"
            value={content}
            onChange={onChangeHandler}
            placeholder="내용을 입력해 주세요"
            maxLength={20}
            required
            className="w-1/4 border rounded-md p-1 ml-2"
          />
          <button type="submit" className="w-28 p-1 bg-white hover:bg-gray-100 text-gray-800 border rounded">
            등록
          </button>
        </form>
      ) : null}

      <div className="w-2/5 flex flex-col gap-2 pt-16 p-5">
        {review?.map((prev) => (
          <div key={prev.reviewId} className="flex flex-col items-start gap-2">
            <div className="flex gap-2 items-center">
              <IoChatbubblesOutline className="text-2xl" />
              <span className="text-xl">{prev.nickname}</span>
              <span className="text-sm text-gray-400">{prev.createdAt}</span>
            </div>
            <div className="flex items-center gap-3 mb-10">
              {changeNow && nowId === prev.reviewUid ? (
                <input
                  type="text"
                  name="changeContent"
                  value={changeContent}
                  maxLength={20}
                  onChange={onChangeHandler}
                  required
                  className="border p-1 rounded-md"
                />
              ) : (
                <div className="text-3xl">{prev.content}</div>
              )}

              {userUid === prev.writerId && !changeNow ? (
                <div className="ml-16 flex gap-8">
                  <button className="review__button-field" onClick={() => reviewChangeBtn(prev)}>
                    수정
                  </button>
                  <button className="review__button-field" onClick={() => reviewDelete(prev.reviewUid)}>
                    삭제
                  </button>
                </div>
              ) : null}
              {changeNow && nowId === prev.reviewUid ? (
                <div className="ml-16 flex gap-8">
                  <button className="review__button-field" onClick={() => reviewChange(prev)}>
                    수정완료
                  </button>
                  <button className="review__button-field" onClick={reviewChangeCancel}>
                    취소
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
