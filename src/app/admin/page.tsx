'use client';

import { db, storage } from '@/api/fiebaseApi';
import { CATEGORIES, DELIVERYS } from '@/types/product-type';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { AiOutlineFileImage } from 'react-icons/ai';
import { FaImages } from 'react-icons/fa';
import Header from '@/components/common/Header';

export default function Admin() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const key = uuidv4();
    const storageRef = ref(storage, key);

    const formData = new FormData(e.currentTarget);
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const info = formData.get('info') as string;
    const delivery = formData.get('delivery') as string;
    const seller = formData.get('seller') as string;
    const price = formData.get('price') as number | null;
    const weight = formData.get('weight') as string;

    try {
      let image = '';
      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, 'data_url');
        image = await getDownloadURL(data?.ref);
      }

      const newProduct = {
        productId: uuidv4(),
        image,
        category,
        title,
        info,
        delivery,
        seller,
        price,
        weight,
        createdAt: new Date()?.toLocaleString(),
        quantity: 1
      };

      await addDoc(collection(db, 'product'), {
        ...newProduct
      });
      toast?.success('상품이 등록되었습니다.');
      (e.target as HTMLFormElement).reset();
      setImageUrl('');
    } catch (error: any) {
      console.log(error);
      toast?.error(error.code);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center ">
      <Header />
      {/* <h1 className="items-center text-4xl font-bold"> 제품 등록하기 </h1> */}

      <form onSubmit={handleSubmit} className="flex flex-col m-auto w-1/3 mt-15 mb-20">
        =======
        <div className=" flex flex-colitems-center h-auto mt-10">
          {imageUrl ? (
            <img src={imageUrl} alt="image" className="flex w-96 h-auto items-center mx-auto" />
          ) : (
            <AiOutlineFileImage className="flex w-96 h-72 items-center mx-auto " />
          )}
        </div>
        <div className="flex flex-row justify-between mx-10 my-5 mt-3">
          <label htmlFor="file">
            <FaImages className=" size-10  w-full cursor-pointer " />
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
          className="mb-6 h-10 cursor-pointer"
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
          required
          // placeholder="제품명을 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="category" className="admin__label-field">
          배송일정
        </label>
        <select
          name="delivery" //
          id="delivery"
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
          required
          placeholder="판매금액을 입력해주세요"
          className="admin__input-field"
        />
        <label htmlFor="weight" className="admin__label-field mb-2">
          중량/용량
        </label>
        <input
          type="text" //
          name="weight"
          id="weight"
          required
          placeholder="중량/용량을 입력해주세요"
          className="admin__input-field"
        />
        <button type="submit" disabled={isSubmitting} className="border">
          등록
        </button>
      </form>
    </div>
  );
}
