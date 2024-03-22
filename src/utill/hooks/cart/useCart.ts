import { readCartData } from '@/api/cartFirebaseApi';
import { userId } from '@/api/user';
import { ProductType } from '@/types/product-type';
import { useQuery, useMutation } from '@tanstack/react-query';

/** useQuery 모음 */
export function useReadCartData() {
  return useQuery<ProductType[], Error>({
    queryKey: ['carts', userId],
    queryFn: () => readCartData(userId)
  });
}

// /** useMutation 모음 */
// export function useAddCartMutation () {
//   return useMutation({
//     mutationFn: updateDoc(); //~~~~
//   })
// }
