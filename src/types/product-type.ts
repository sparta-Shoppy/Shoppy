export interface ProductType {
  productId?: string;
  image: string;
  category: string;
  title: string;
  info: string;
  delivery: string;
  seller: string;
  price: number;
  weight: string;
  createdAt: string;
  quantity: number;
}

export interface NewReviewType {
  writerId: string;
  content: string;
  createdAt: string;
  productId: string;
  nickname: string;
  reviewId: string;
}

export interface ReviewInputType {
  content: string;
  changeContent: string;
}

export interface NewAskType {
  askId: string;
  writerId: string;
  content: string;
  createdAt: string;
  productId: string;
  secret: boolean;
  answer: string;
  nickname: string;
}

export interface AskInputType {
  content: string;
  changeContent: string;
  adminContent: string;
}

export type CategoryType = '과일/채소' | '고기' | '가공식품' | '해산물';
export const CATEGORIES: CategoryType[] = ['과일/채소', '고기', '가공식품', '해산물'];

export type DeliveryType = '샛별배송' | '3일 이내 배송' | '7일 이내 배송';
export const DELIVERYS: DeliveryType[] = ['샛별배송', '3일 이내 배송', '7일 이내 배송'];
