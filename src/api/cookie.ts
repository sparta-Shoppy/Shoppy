'use server';

import { cookies } from 'next/headers';

//관리자일 경우
export async function setAdminCookie({ uid }: any) {
  const cookieStore = cookies();
  cookieStore.set('admin', uid);
}

//사용자일 경우
export async function setUserCookie({ uid }: any) {
  const cookieStore = cookies();
  cookieStore.set('user', uid);
}

//쿠키 삭제
export async function deleteAdminCookie() {
  const cookieStore = cookies();
  cookieStore.delete('user');
  cookieStore.delete('admin');
}
