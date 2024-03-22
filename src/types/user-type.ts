import { Auth } from 'firebase/auth';

export interface userValidate {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  isIdCheck?: boolean;
}

export interface setUserJoin {
  userId: string | undefined;
  email: string | null;
  password: string;
  nickname: string;
}

export interface setUserLogin {
  uid: string;
  displayName: string | null;
  email: string | null;
}
