// import { useEffect } from 'react';

// const SocialKakao = () => {
//   const Rest_api_key = '16fc74ce90c16c9865fec22e045490ab'; //REST API KEY
//   const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI
//   // oauth 요청 URL
//   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

//   const handleLogin = () => {
//     window.location.href = kakaoURL;
//   };

//   //   인가코드 추출 방법
//   const code = new URL(window.location.href).searchParams.get('code');

//   console.log('인가받은 코드 추출', code);
//   return (
//     <>
//       <button onClick={handleLogin}>카카오 로그인</button>
//     </>
//   );
// };
// export default SocialKakao;

// // Access Token 받아오기
// const getAccessToken = async () => {
//   //   if (accessTokenFetching) return; // Return early if fetching

//   console.log('getAccessToken 호출');

//   try {
//     // setAccessTokenFetching(true); // Set fetching to true

//     const response = await axios.post(
//       '~~~/api/auth/kakao',
//       {
//         authorizationCode: KAKAO_CODE
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     const accessToken = response.data.accessToken;
//     console.log('accessToken:', accessToken);

//     setUserInfo({
//       ...userInfo,
//       accessToken: accessToken
//     });

//     setAccessTokenFetching(false); // Reset fetching to false
//     navigate('/');
//   } catch (error) {
//     console.error('Error:', error);
//     setAccessTokenFetching(false); // Reset fetching even in case of error
//   }
// };
