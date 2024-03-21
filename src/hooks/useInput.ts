import { NewUserType } from '@/types/product-type';
import { useState, ChangeEvent } from 'react';

const useInput = (initialValue: NewUserType) => {
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
