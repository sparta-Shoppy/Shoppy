export interface ProductType {
  productId?: string;
  image: string;
  category: string;
  title: string;
  delivery: string;
  seller: string;
  price: number;
  weight: number;
  createdAt: string;
}
export interface NewReviewType {
  reviewId: string;
  writerId: string;
  content: string;
  createdAt: string;
  productId: string;
}

export type CategoryType = '과일/채소' | '고기' | '가공식품' | '해산물';
export const CATEGORIES: CategoryType[] = ['과일/채소', '고기', '가공식품', '해산물'];

export type DeliveryType = '샛별배송' | '3일 이내 배송' | '7일 이내 배송';
export const DELIVERYS: DeliveryType[] = ['샛별배송', '3일 이내 배송', '7일 이내 배송'];
