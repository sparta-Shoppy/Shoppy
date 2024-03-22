import { configureStore } from '@reduxjs/toolkit';
import user from '@/store/modules/user';
import modal from '@/store/modules/isModalToggle';

//store 생성
const store = configureStore({
  reducer: {
    user,
    modal
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
