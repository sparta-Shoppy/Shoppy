"use client";

import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../api/fiebaseApi';

export interface NewReviewType {
      reviewId:string; // 게시글(파이어베이스 그거) 아이디
      writerId: string; // 작성자 아이디
      content: string; // 글 내용
      createdAt: string; // 날짜
      productId: string; // 상품아이디
}

function Review() {
  const [content, setContent] = useState<string>("");
  const [review, setReview] = useState<NewReviewType[]>();
  const [changeNow, setChangeNow] = useState<boolean>(false);
  const [changeContent, setChangeContent] = useState<string>("");
  const [nowId, setNowId] = useState<string>("");

  const params = useParams();
const loginNow = "현재아이디"
  
  

  // 작성
  const reviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      writerId: "현재아이디",
      content,
      createdAt: new Date().toLocaleString("ko", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }),
      productId: params.id,
    }
    await addDoc(collection(db, "review"), newReview);
    alert("후기 등록 완료!");
    setContent("");
  }

  // 후기 작성글 불러오기
  useEffect(() => {
    const fetchCommentData = async () => {
      const q = query(collection(db, 'review'), where('productId', '==', params.id));
      const querySnapshot = await getDocs(q);

      const initialData:any = [];

      querySnapshot.forEach((doc) => {
        initialData.push({ reviewId: doc.id, ...doc.data() });
      });

      setReview([...initialData]);
    };

    fetchCommentData();
  }, [content]);

  // 삭제
  const reviewDelete = async (reviewId:string) => {
    const real = window.confirm("삭제하시겠습니까?");
    if(real){
      const reviewRef = doc(db, "review", reviewId);
      await deleteDoc(reviewRef);
      setReview((prev) => {
      return prev?.filter((element) => element.reviewId !== reviewId)
    })
    } else {
      return;
    }
  }

  // 수정완료 불러오기
  const reviewChangeBtn = (reviewId:string) => {
    setChangeNow(true);
    setNowId(reviewId);
  }

  // 수정취소
  const reviewChangeCancel = () => {
    setChangeNow(false);
    setChangeContent("");
    setNowId("");
  }

  // 수정된 input 값
  const reviewChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeContent(e.target.value);
  }

  // 수정
  const reviewChange = async (prev:NewReviewType) => {
    const reviewRef = doc(db, "review", prev.reviewId);
    if (changeContent === prev.content) {
      alert("수정된게 없어요!");
      return;
    } else {
      const real = window.confirm("수정하시겠습니까?");
      if(real){
        await updateDoc(reviewRef, { ...prev, content: changeContent});
        setChangeContent("");
        setChangeNow(false);
        setReview((item) => {
          return (item?.map((element) => {
            if (element.reviewId === prev.reviewId) {
              return { ...element, content: changeContent};
            } else {
              return element;
            }
          })
          );
        });
        alert("수정완료!");
      }
    }
  }
  

  return (
    <div>
        <form onSubmit={reviewSubmit}>
          <input type='text' value={content} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value);
          }} placeholder='내용을 입력해 주세요' minLength={3} maxLength={20} required
          className="input input-bordered w-full max-w-xs"/>
          <button type='submit' className="btn">등록</button>
        </form>

        <div>
          {review?.map((prev) => {
            return(<div key={prev.reviewId}>
              <div>
                <span className='text-xl font-bold mr-2'>{prev.writerId}</span>
                <span className='text-sm text-gray-400'>{prev.createdAt}</span>
              </div>
              {changeNow && nowId === prev.reviewId ? <input type='text' 
              required minLength={3} maxLength={20} value={changeContent} onChange={reviewChangeInput}
              className="input input-bordered input-sm w-full max-w-xs"/>
              :
              <div className='text-3xl'>{prev.content}</div>
              }
              
              {loginNow === prev.writerId ? 
              <div className='flex gap-2'>
                {changeNow && nowId === prev.reviewId ? 
                <>
                  <button className="btn" onClick={() => reviewChange(prev)}>수정완료</button>
                  <button className="btn" onClick={reviewChangeCancel}>취소</button>
                </>
                :
                <>
                  <button className="btn" onClick={()=>reviewChangeBtn(prev.reviewId)}>수정</button>
                  <button className="btn" onClick={()=>reviewDelete(prev.reviewId)}>삭제</button>
                </>
                }
                
              </div>:
              <></>
              }
              
            </div>)
          })}
        </div>
    </div>
  )
}

export default Review