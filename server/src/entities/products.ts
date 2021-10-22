import { Product } from '../typings/interface';

const products: Product[] = [
  {
    id: 1,
    name: 'Small Pizza',
    price: 11.99,
    description: "10'' pizza for one person",
    currency: '$',
    quantity: 1,
    discountPrice: 11.99
  },

  {
    id: 2,
    name: 'Medium Pizza',
    price: 15.99,
    description: "12'' Pizza for two persons",
    currency: '$',
    quantity: 1,
    discountPrice: 15.99
  },

  {
    id: 3,
    name: 'Large Pizza',
    price: 21.99,
    description: "15'' Pizza for four persons",
    currency: '$',
    quantity: 1,
    discountPrice: 19.99
  }
];

export default products;
