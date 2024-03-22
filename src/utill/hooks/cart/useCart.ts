import { createCartData, deleteCartData, readCartData, updateCartData } from '@/api/cartFirebaseApi';
import { userId } from '@/api/user';
import { CartButtonType, UpdateCartProps } from '@/types/cart-type';
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

export function useDeleteCartData() {
  const queryClient = useQueryClient();

  const { mutate: deleteCartMutate } = useMutation<void, Error, string>({
    mutationFn: (productId) => deleteCartData(productId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });
  return { deleteCartMutate };
}

export function useUpdateCartData() {
  const queryClient = useQueryClient();

  const { mutate: updateCartMutate } = useMutation<void, Error, UpdateCartProps>({
    mutationFn: ({ userId, productId, quantity }) => updateCartData({ userId, productId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });

  return { updateCartMutate };
}
