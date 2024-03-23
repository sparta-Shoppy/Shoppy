'use client';

import { ReviewInputType } from '@/types/product-type';
import { useState, ChangeEvent } from 'react';

const reviewInput = (initialValue: ReviewInputType) => {
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

  return { value, onChangeHandler, reset, dataLoad };
};

export default reviewInput;
