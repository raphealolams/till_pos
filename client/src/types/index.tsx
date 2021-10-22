export type CartItemProps = {
  id: number;
    name: string;
    price: number;
    quantity: number;
};

export type CartItemType = {
  id: number;
   name: string;
    price: number;
  description: string;
  currency: string
  quantity: number;
}

export type ProductItemProps = {
  id: number;
    name: string;
    price: number;
    description: string;
  currency: string;
  quantity: number;
  addToCart: (clickedItem: CartItemType) => void;
  handleInputChange: (quantity: number) => void;
};

export interface Products {
  products: CartItemType[] | undefined;
  quantity: number;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  handleInputChange: (quantity: number) => void;
  customerName: string;
}