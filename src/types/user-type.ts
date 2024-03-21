import { Auth } from 'firebase/auth';

export interface userValidate {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  isIdCheck: boolean;
}

export interface SetUser {
  auth: Auth;
  email: string;
  password: string;
  nickname: string;
  createdAt: string;
}
