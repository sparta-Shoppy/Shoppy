'use client';

import { db, storage } from '@/api/fiebaseApi';
import { CATEGORIES, CategoryType, DELIVERYS } from '@/types/product-type';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { AiOutlineFileImage } from 'react-icons/ai';
import { FaImages } from 'react-icons/fa';

export default function Admin() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [delivery, setDelivery] = useState<string>('');
  const [seller, setSeller] = useState<string>('');
  const [price, setPrice] = useState<number | undefined>();
  const [weight, setWeight] = useState<string>('');
  const [info, setInfo] = useState<string>('');

  const handleFileUpload = (e: any) => {
    const {
      target: { files }
    } = e;

    const file = files?.[0];

    //이미지 파일 읽기 (사용자 컴퓨터에 저장해 줄 수 있으나 나는 사용 x)
    const fileReader = new FileReader();

    //인코딩 된 스트링 데이터를 리턴할 수 있도록
    fileReader?.readAsDataURL(file);

    //loadend event 파일을 읽었는지 확인할 수 있음
    fileReader.onloadend = (e: any) => {
      // console.log(e);
      const { result } = e?.currentTarget;
      setImageUrl(result);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const key = uuidv4();
    const storageRef = ref(storage, key);

    try {
      let image = '';
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, 'data_url');
        image = await getDownloadURL(data?.ref);
      }

      await addDoc(collection(db, 'product'), {
        productId: uuidv4(),
        image,
        category,
        title,
        info,
        delivery,
        seller,
        price,
        weight,
        createdAt: new Date()?.toLocaleString()
      });

      toast?.success('상품이 등록되었습니다.');
      setImageUrl(null);
      setCategory('');
      setTitle('');
      setInfo('');
      setDelivery('');
      setSeller('');
      setPrice(0);
      setWeight('');
    } catch (error: any) {
      console.log(error);
      toast?.error(error.code);
    }

    setIsSubmitting(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      target: { name, value }
    } = e;

    if (name === 'category') {
      setCategory(value as CategoryType);
    }

    if (name === 'title') {
      setTitle(value);
    }

    if (name === 'info') {
      setInfo(value);
    }

    if (name === 'delivery') {
      setDelivery(value);
    }

    if (name === 'seller') {
      setSeller(value);
    }

    if (name === 'price') {
      setPrice(parseInt(value, 10));
    }

    if (name === 'weight') {
      setWeight(value);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="items-center text-4xl font-bold"> 제품 등록하기 </h1>
      <form onSubmit={handleSubmit} className="flex flex-col m-auto w-1/3 ">
        <div className=" flex flex-colitems-center h-auto mt-10">
          {imageUrl ? (
            <img src={imageUrl} alt="image" className="flex w-96 h-auto items-center mx-auto" />
          ) : (
            <AiOutlineFileImage className="flex w-96 h-72 items-center mx-auto " />
          )}
        </div>
        <div className="flex flex-row justify-between mx-10 my-5 mt-3">
          <label htmlFor="file">
            <FaImages className=" size-10  w-full " />
            <input
              type="file" //
              accept="image/*"
              name="file"
              id="file"
              required
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button>등록</button>
        </div>
        <label htmlFor="category" className="admin__label-field">
          카테고리
        </label>
        <select
          name="category" //
          id="category"
          value={category}
          onChange={onChange}
          className="mb-6 h-10"
          required
        >
          <option className="admin__input-field">카테고리를 선택해주세요</option>
          {CATEGORIES?.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="file" className="admin__label-field">
          제품명
        </label>
        <input
          type="text" //
          name="title"
          id="title"
          value={title}
          onChange={onChange}
          required
          // placeholder="제품명을 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="info" className="admin__label-field">
          상품 설명
        </label>
        <input
          type="text" //
          name="info"
          id="info"
          value={info}
          onChange={onChange}
          required
          // placeholder="제품명을 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="category" className="admin__label-field">
          배송일정
        </label>
        <select
          name="category" //
          id="category"
          value={delivery}
          onChange={onChange}
          className="mb-6 h-10"
          required
        >
          <option className="admin__input-field">배송일정을 선택해주세요</option>
          {DELIVERYS?.map((delivery) => (
            <option value={delivery} key={delivery}>
              {delivery}
            </option>
          ))}
        </select>
        <label htmlFor="seller" className="admin__label-field mb-2">
          판매자
        </label>
        <input
          type="text" //
          name="seller"
          id="seller"
          value={seller}
          onChange={onChange}
          required
          placeholder="판매자를 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="price" className="admin__label-field mb-2">
          판매 금액
        </label>
        <input
          type="number" //
          name="price"
          id="price"
          value={price}
          onChange={onChange}
          required
          placeholder="판매금액을 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="weight" className="admin__label-field mb-2">
          중량
        </label>
        <input
          type="text" //
          name="weight"
          id="weight"
          value={weight}
          onChange={onChange}
          required
          placeholder="중량을 입력해주세요"
          className="admin__input-field"
        />
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </form>
    </div>
  );
}
