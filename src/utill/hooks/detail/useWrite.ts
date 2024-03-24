import { getUserReviewData, getUserAskData, getUserLikeData } from '@/api/writeApi';
import { likeInterface } from '@/app/profile/page';
import { NewReviewType } from '@/types/product-type';
import { useQuery } from '@tanstack/react-query';

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
