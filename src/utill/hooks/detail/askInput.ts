import { AskInputType } from '@/types/product-type';
import { useState, ChangeEvent } from 'react';

const askInput = (initialValue: AskInputType) => {
  const [value, setValue] = useState(initialValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setValue(initialValue);
  };

  const dataLoad = (data: string) => {
    setValue((prev) => ({ ...prev, changeContent: data }));
  };

  const adminDataLoad = (data: string) => {
    setValue((prev) => ({ ...prev, adminContent: data }));
  };

  return { value, onChangeHandler, reset, dataLoad, adminDataLoad };
};

export default askInput;
