import { database } from '@/api/fiebaseApi';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { get, ref } from 'firebase/database';
import { setAdminCookie, setUserCookie } from './cookie';

//request, response 개념
export async function onUserStateChange(auth: Auth, call: any) {
  onAuthStateChanged(auth, async (user) => {
    // 로그인 여부 확인
    const updatedUser = user ? await admins(user) : null;

    call(updatedUser);
  });
}

// 사용자 및 관리자 여부 확인
// //true: 관리자, false: 사용자
async function admins(user: any) {
  try {
    //Firebase의 RealTimeDataBase에 별도로 저장한 관리자 계정 가져오기
    const checkRef = await get(ref(database, 'admins'));
    if (checkRef.exists()) {
      const admins = checkRef.val();
      const isAdmins = admins.includes(user.uid); //로그인된 user가 관리자일 경우 isAdmins= true, 사용자일 경우 isAdmins= false
      isAdmins ? setAdminCookie(user.uid) : setUserCookie(user.uid);
      return { ...user, isAdmins };
    }
    return user;
  } catch (error) {
    alert('에러발생했습니다.');
    return null;
  }
}
