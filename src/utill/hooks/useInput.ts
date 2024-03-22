import { userValidate } from '@/types/user-type';
import { useState, ChangeEvent } from 'react';

const useInput = (initialValue: userValidate) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChangeHandler, reset };
};

export default useInput;
