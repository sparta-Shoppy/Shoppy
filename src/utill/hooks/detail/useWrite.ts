import { getUserReviewData, getUserAskData } from '@/api/writeApi';
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
