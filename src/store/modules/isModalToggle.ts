//초기 타입 설정

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';

interface modalToggle {
  isLogin?: boolean;
  isJoin?: boolean;
}

const initialState: modalToggle = {
  isLogin: false,
  isJoin: false
};

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    loginModalAction: (state, action: PayloadAction<modalToggle['isLogin']>) => {
      state.isLogin = action.payload;
    },
    joinModalAction: (state, action: PayloadAction<modalToggle['isJoin']>) => {
      state.isJoin = action.payload;
    }
  }
});

export const { loginModalAction, joinModalAction } = ModalSlice.actions;
export const loginState = (state: RootState) => state.modal.isLogin;
export const joinState = (state: RootState) => state.modal.isJoin;
export default ModalSlice.reducer;
