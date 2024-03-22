import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

//미들웨어에서는 로컬스토리지의 정보를 받아올 수 없으므로 쿠키를 사용
//쿠키는 서버 및 라우터헨들러에서만 사용가능
//현재 구조에선 클라이언트 컴포넌트에서 사용할 수 있게 별도의 쿠키 생성 및 삭제 로직 구현
export function middleware(request: NextRequest, response: NextResponse) {
  const cookieStore = cookies();
  const cookie = cookieStore.getAll();

  const adminCookie = cookie.find((item) => item.name === 'admin');
  const userCookie = cookie.find((item) => item.name === 'user');

  if (!adminCookie) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 장바구니 페이지 경로
  if (userCookie) {
    // 로그인일 경우
  }
}

export const config = {
  // 특정 경로에서 Middleware가 실행되도록 필터링
  matcher: '/admin'
};
