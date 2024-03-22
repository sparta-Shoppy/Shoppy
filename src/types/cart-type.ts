export interface CartType {
  productId: string;
  image: string;
  title: string;
  info: string;
  price: string;
  quantity: number;
}
export interface CartButtonType {
  item: CartType;
  userId: string;
}
