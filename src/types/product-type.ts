export interface ProductType {
  productId?: string;
  image: string;
  category: string;
  title: string;
  delivery: string;
  seller: string;
  price: number;
  weight: number;
}

export type CategoryType = '과일/채소' | '고기' | '가공식품' | '해산물';
export const CATEGORIES: CategoryType[] = ['과일/채소', '고기', '가공식품', '해산물'];
