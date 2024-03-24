import { getMainProducts, getProducts } from '@/api/productFirebaseApi';
import { useQuery } from '@tanstack/react-query';

export function useGetMainProducts(selectedTab: boolean) {
  return useQuery({
    queryKey: ['mainProducts'],
    queryFn: () => getMainProducts(selectedTab)
  });
}

export function useGetProducts(selectedTab: boolean, category: string) {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(selectedTab, category)
  });
}
