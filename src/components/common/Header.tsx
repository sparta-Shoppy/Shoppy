'use client';

import React, { useState } from 'react';
import Login from '../main/Login';

const Header = () => {
  const [isLoginToggle, setIsLoginToggle] = useState(false);
  const [isJoinToggle, setIsJoinToggle] = useState();
  return (
    <div className="flex m-auto w-11/12  justify-between">
      <div className="">
        <img src="assets/logo.png" alt="logo" className="w-3/6 mt-2" />
      </div>
      <div className="w-72 flex justify-evenly items-center text-l tex t">
        <p className="cursor-pointer hover:text-slate-300 font-bold">회원가입</p>
        <button className="cursor-pointer hover:text-slate-300 font-bold" onClick={() => setIsLoginToggle(true)}>
          로그인
        </button>
      </div>
      {isLoginToggle ? <Login /> : null}
    </div>
  );
};

export default Header;
