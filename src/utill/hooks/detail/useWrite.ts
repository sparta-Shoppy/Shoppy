import {
  getUserReviewData,
  getItemReviewData,
  getItemAskData,
  getUserAskData,
  itemReviewCreate,
  itemReviewDelete,
  getUserLikeData
} from '@/api/writeApi';
import { likeInterface } from '@/app/profile/page';
import { NewReviewType } from '@/types/product-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useReadWriteData(userId: string) {
  return useQuery<NewReviewType[]>({
    queryKey: ['write', userId],
    queryFn: () => getUserReviewData(userId)
  });
}

export function useReadAskData(userId: string) {
  return useQuery<NewReviewType[]>({
    queryKey: ['ask', userId],
    queryFn: () => getUserAskData(userId)
  });
}

export function useReadLikeData(userId: string) {
  return useQuery<likeInterface[]>({
    queryKey: ['likeData', userId],
    queryFn: () => getUserLikeData(userId)
  });
}

export function itemReadReviewData(item: string | string[]) {
  return useQuery<NewReviewType[]>({
    queryKey: ['itemReview', item],
    queryFn: () => getItemReviewData(item)
  });
}
export function itemReadAskData(item: string | string[]) {
  return useQuery<NewReviewType[]>({
    queryKey: ['itemAsk', item],
    queryFn: () => getItemAskData(item)
  });
}

export function itemReviewCreateDate() {
  const queryClient = useQueryClient();

  const { mutate: createReview } = useMutation<void, Error, NewReviewType>({
    mutationFn: (createReview) => itemReviewCreate(createReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemReview'] });
    }
  });
  return { createReview };
}

export function itemReviewDeleteDate() {
  const queryClient = useQueryClient();

  const { mutate: deleteId } = useMutation<void, Error, string>({
    mutationFn: (deleteId) => itemReviewDelete(deleteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itemReview'] });
    }
  });
  return { deleteId };
}
