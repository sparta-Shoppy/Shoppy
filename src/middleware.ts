import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest, response: NextResponse) {
  const cookieStore = cookies();
  const cookie = cookieStore.getAll();

  const adminCookie = cookie.find((item) => item.name === 'admin');
  const userCookie = cookie.find((item) => item.name === 'user');

  // 경로가 '/admin'이면서 관리자 쿠키가 없다면 홈페이지로 리디렉션
  if (request.nextUrl.pathname === '/admin' && !adminCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 경로가 '/profile'이면서 사용자 쿠키도 관리자 쿠키도 없다면 홈페이지로 리디렉션
  if (request.nextUrl.pathname === '/profile' && !adminCookie && !userCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}
