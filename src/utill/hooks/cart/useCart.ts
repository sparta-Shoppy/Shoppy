import { createCartData, readCartData } from '@/api/cartFirebaseApi';
import { userId } from '@/api/user';
import { CartButtonType } from '@/types/cart-type';
import { ProductType } from '@/types/product-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useReadCartData() {
  return useQuery<ProductType[], Error>({
    queryKey: ['carts', userId],
    queryFn: () => readCartData(userId)
  });
}

export function useCreateCartData() {
  const queryClient = useQueryClient();

  const { mutate: createCartMutate } = useMutation<void, Error, CartButtonType>({
    mutationFn: ({ item, userId }) => createCartData(item, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });
  return { createCartMutate };
}
