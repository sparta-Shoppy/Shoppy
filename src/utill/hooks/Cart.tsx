// import { db } from '@/api/fiebaseApi';
// import { ProductType } from '@/types/product-type';
// import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
// import { TiShoppingCart } from 'react-icons/ti';
// import { toast } from 'react-toastify';

// interface CartButtonProps {
//   item: ProductType;
//   userId: string;
// }

// export default function Cartbutton({ item, userId }: CartButtonProps) {
//   const onClickCart = async () => {
//     const cartRef = doc(db, 'carts', userId);

//     try {
//       // 문서의 현재 스냅샷 가져오기
//       const cartSnapshot = await getDoc(cartRef);

//       // 문서가 있으면 products 배열에 상품 추가
//       if (cartSnapshot.exists()) {
//         await updateDoc(cartRef, {
//           products: arrayUnion({
//             productId: item.productId,
//             image: item.image,
//             category: item.category,
//             title: item.title,
//             info: item.info,
//             delivery: item.delivery,
//             seller: item.seller,
//             price: item.price,
//             weight: item.weight,
//             quantity: item.quantity
//           })
//         });
//       } else {
//         // 문서 없으면 새 문서 만들어서 products 배열 초기화
//         await setDoc(cartRef, {
//           products: [
//             {
//               productId: item.productId,
//               image: item.image,
//               category: item.category,
//               title: item.title,
//               info: item.info,
//               delivery: item.delivery,
//               seller: item.seller,
//               price: item.price,
//               weight: item.weight
//             }
//           ]
//         });
//       }
//       toast.success('장바구니에 추가되었습니다.');
//     } catch (error) {
//       toast.error('장바구니에 추가하지 못했습니다.');
//     }
//   };

//   return (
//     <button onClick={onClickCart}>
//       <TiShoppingCart className="text-3xl ml-1 mr-1 hover:text-stone-300" />
//     </button>
//   );
// }
