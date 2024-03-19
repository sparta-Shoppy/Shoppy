import { configureStore } from '@reduxjs/toolkit';
import user from '@/store/modules/user';

//store 생성
const store = configureStore({
  reducer: {
    user
  }
});

export type RootState = ReturnType<typeof store.getState>;

// 스토어의 디스패치 함수 타입을  AppDispatch 타입으로 정의
// typeof store.dispatch: 스토어의 dispatch 메서드의 타입을 나타낸다.
export type AppDispatch = typeof store.dispatch;

export default store;
