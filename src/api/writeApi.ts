import { NewReviewType } from '@/types/product-type';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './fiebaseApi';
import { likeInterface } from '@/app/profile/page';

// 현재 서버 컴포넌트로 사용할 수 없는 이유
// 구조:클라이언트 측에서는 api 요청을 보내고 ==> api요청을 받은 백엔드 측에서는 ==>  서버에 있는 데이터를 가져와야하지만
// 현재 baas 형태의 firebase를 사용하여 firebase 측에서 백엔드 및 서버측 관리를 전부 하고있 으므로 사용 불가

//유저의 리뷰 글
export const getUserReviewData = async (userId: string): Promise<NewReviewType[]> => {
  const itemDB = query(collection(db, 'review'), where('writerId', '==', userId));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};

//유저의 문의 글
export const getUserAskData = async (userId: string): Promise<NewReviewType[]> => {
  const itemDB = query(collection(db, 'ask'), where('writerId', '==', userId));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};

//유저의 찜한 상품
export const getUserLikeData = async (userId: string): Promise<likeInterface[]> => {
  const itemDB = query(collection(db, 'liked'), where('userId', '==', userId));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};

// 상품 리뷰 불러오기
export const getItemReviewData = async (item: string | string[]): Promise<NewReviewType[]> => {
  const itemDB = query(collection(db, 'review'), where('productId', '==', item));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};

// 상품 문의 불러오기
export const getItemAskData = async (item: string | string[]): Promise<NewReviewType[]> => {
  const itemDB = query(collection(db, 'ask'), where('productId', '==', item));
  const querySnapshot = await getDocs(itemDB);

  const initialData: any = [];

  querySnapshot.forEach((doc) => {
    initialData.push({ ...doc.data() });
  });

  return initialData;
};

export const itemReviewCreate = async (newReview: NewReviewType): Promise<void> => {
  await addDoc(collection(db, 'review'), newReview);
};

export const itemReviewDelete = async (reviewId: string) => {
  const reviewRef = doc(db, 'review', reviewId);
  await deleteDoc(reviewRef);
};

// export const itemReviewUpdate = async (prev: NewReviewType, changeContent:string) => {
//   const reviewRef = doc(db, 'review', prev.reviewId);
//   await updateDoc(reviewRef, { ...prev, content: changeContent });
// };
