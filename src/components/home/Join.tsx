'use client';
import React, { FormEvent } from 'react';

const Join = () => {
  const onJoinSubmitEventHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const id = formData.get('id') as string;
    const password = formData.get('password') as string;
  };
  return (
    // <form onSubmit={onJoinSubmitEventHandler}>
    //   <input type="text" name="id"></input>
    //   <input type="password" name="password"></input>
    //   <button type="submit">로그인</button>
    // </form>
    <></>
  );
};

export default Join;
