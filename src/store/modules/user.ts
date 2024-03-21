import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config/configStore';

//인터페이스 정의
interface UserState {
  value: string | null;
  adminReal: boolean;
}

//초기 상태 값

const initialState: UserState = {
  value: null,
  adminReal: false
};

//slice 설정
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAction: (state, action: PayloadAction<UserState>) => {
      state.value = action.payload;
    },
    userAdmin: (state, action: PayloadAction<boolean>) => {
      state.adminReal = action.payload;
    }
  }
});

export const { userAction, userAdmin } = UserSlice.actions;
export const userState = (state: RootState) => state.user.value;
export default UserSlice.reducer;
