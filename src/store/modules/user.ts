import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';

//인터페이스 정의
interface UserState {
  userId: string;
  nickname: string;
}

//초기 상태 값

const initialState: UserState = {
  userId: '',
  nickname: ''
};

//slice 설정
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAction: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
    }
  }
});

export const { userAction } = UserSlice.actions;
export const userState = (state: RootState) => state.user.userId;
export const nicknameState = (state: RootState) => state.user.nickname;
export default UserSlice.reducer;
