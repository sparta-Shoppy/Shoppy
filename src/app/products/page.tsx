// 'use client';
// import { db } from '@/api/fiebaseApi';
// import Header from '@/components/common/Header';
// import { ProductType } from '@/types/product-type';
// import { stringTransform } from '@/utill/hooks/transform';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { IoHeartSharp } from 'react-icons/io5';
// import { LiaCartArrowDownSolid } from 'react-icons/lia';

// export default function ProductPage() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [heart, setHeart] = useState(false);
//   const [selectedTab, setSelectedTab] = useState(true);

//   const params = useSearchParams();
//   console.log('params', params.get('category'));
//   const category = params.get('category');

//   useEffect(() => {
//     const fetchProductsData = async () => {
//       try {
//         const querySnapshot = await getDocs(
//           query(collection(db, 'product'), where('category', '==', category), orderBy('price', 'desc'))
//         );
//         const fetchedProducts: any[] = [];
//         querySnapshot.forEach((doc) => {
//           const products = doc.data();
//           fetchedProducts.push({ ...products, id: doc.id, products });
//         });

//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.log('상품 데이터 가져오기 실패', error);
//       }
//       fetchProductsData();
//     };
//   }, [selectedTab]);

//   // 하트 클릭 시 색상 변경
//   const handleHeart = () => {
//     setHeart(!heart);
//   };

//   return (
//     <div>
//       <Header />
//       <div className="w-11/12 flex justify-end ">
//         <span
//           className={`cursor-pointer mr-2 ${selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
//           onClick={() => setSelectedTab(true)}
//         >
//           높은 가격순
//         </span>
//         ||
//         <span
//           className={`cursor-pointer mx-2 ${!selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
//           onClick={() => setSelectedTab(false)}
//         >
//           낮은 가격순
//         </span>
//       </div>

//       <div className="m-auto w-full flex flex-wrap justify-center">
//         {products?.map((item) => {
//           return (
//             <div key={item.productId} className="w-1/4 p-5">
//               <div className="h-full flex flex-col justify-between items-center ">
//                 <img
//                   src={item.image}
//                   alt="상품이미지"
//                   className="w-4/5 h-80 object-cover rounded-md hover:scale-95 transition-all duration-300 cursor-pointer"
//                 />
//                 <button className="w-4/5 mt-3 bg-slate-100 flex justify-center items-center text-black py-2 px-4 hover:bg-white rounded-md">
//                   <span className="text-xl">담기</span> <LiaCartArrowDownSolid className="ml-2 text-3xl" />
//                 </button>
//                 <div className="pt-2 w-4/5">
//                   <p className="text-lg font-semibold">{item.title}</p>
//                   <div className="flex justify-between items-center mt-2">
//                     <div>
//                       <p className="text-lg font-semibold">{item.price ? stringTransform(item.price) : null} 원</p>
//                     </div>
//                     <div className="flex gap-2 items-center">
//                       {heart ? (
//                         <IoHeartSharp onClick={handleHeart} className="text-3xl text-rose-500 cursor-pointer" />
//                       ) : (
//                         <IoHeartSharp onClick={handleHeart} className="text-3xl hover:text-rose-500 cursor-pointer" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//           // <ProductItems key={item.productId} item={item} />;
//         })}
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { db } from '@/api/fiebaseApi';
// import Header from '@/components/common/Header';
// import ProductItems from '@/components/products/ProductItems';
// import { ProductType } from '@/types/product-type';
// import { useQuery } from '@tanstack/react-query';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// export default function ProductPage() {
//   const [products, setProducts] = useState<ProductType[]>([]);
//   const [selectedTab, setSelectedTab] = useState(true);

//   const params = useSearchParams();
//   const category = params.get('category');
//   // params - / 기준으로 전달
//   // useSearchParams - ? 기준으로 전달

//   const { isLoading, isError, data, refetch } = useQuery({
//     queryKey: ['productData'],
//     queryFn: () => {
//       const response = getDocs(
//         query(
//           collection(db, 'product'),
//           where('category', '==', category),
//           selectedTab ? orderBy('price', 'desc') : orderBy('price', 'asc')
//         )
//       );
//       return response;
//     }
//   });

//   useEffect(() => {
//     const query = (data: any) => {
//       const fetchedProducts: any = [];
//       data?.forEach((doc: any) => {
//         const products = doc.data();
//         fetchedProducts.push({ ...products, id: doc.id, products });
//       });
//       setProducts(fetchedProducts);
//     };
//     query(data);
//   }, [data]);

//   useEffect(() => {
//     refetch();
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <div>잠시만 기다려 주세요</div>
//         <img src="../../../assets/bean.gif" alt="로딩중" />
//       </div>
//     );
//   }

//   if (isError) {
//     toast.error('데이터를 가져올 수 없습니다');
//   }

//   return (
//     <div>
//       <Header />
//       <div className="w-11/12 flex justify-end ">
//         <span
//           className={`cursor-pointer mr-2 ${selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
//           onClick={() => setSelectedTab(true)}
//         >
//           높은 가격순
//         </span>
//         ||
//         <span
//           className={`cursor-pointer mx-2 ${!selectedTab ? 'text-zinc-400' : 'text-black hover:text-zinc-400'}`}
//           onClick={() => setSelectedTab(false)}
//         >
//           낮은 가격순
//         </span>
//       </div>
//       <div className="m-auto w-full flex flex-wrap justify-center">
//         {products?.map((item) => {
//           return <ProductItems key={item.productId} item={item} />;
//         })}
//       </div>
//     </div>
//   );
// }
