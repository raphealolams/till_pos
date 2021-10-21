import { useState } from "react";
import { useQuery } from "react-query";

import Product from "./pages/product";

import { CartItemType } from "./types";


const products = [
  {
    id: 1,
    name: "Small Pizza",
    price: 11.99,
    description:
      "10'' pizza for one person",
    currency: "$",
    quantity: 1,
  },

  {
    id: 2,
    name: "Medium Pizza",
    price: 15.99,
    description:
      "12'' Pizza for two persons",
    currency: "$",
    quantity: 1,
  },

  {
    id: 3,
    name: "Large Pizza",
    price: 21.99,
    description:
      "15'' Pizza for four persons",
    currency: "$",
    quantity: 1,
  },
];

const getProducts = async (): Promise<CartItemType[]> => await products
  // await (await fetch("https://fakestoreapi.com/products")).json();
    
const App = () => {
  // const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setItemQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  // console.log({cartItems})
  

   const getTotalCartItems = (items: CartItemType[]) =>
    items.reduce((price: number, item) => price + item.price, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((current, item) => {
        if (item.id === id) {
          if (item.price === 1) return current;
          return [...current, { ...item, amount: item.price - 1 }];
        } else {
          return [...current, item];
        }
      }, [] as CartItemType[])
    );
  };

  const handleInputChange = (quantity: number) => {
    console.log({quantity})
     setItemQuantity(() => quantity);
  }

  if (isLoading) return <div>Loading.......</div>;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <div>
      {
        isLoading ? <div>Loading.......</div> :
          <Product
            products={data}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            handleInputChange={handleInputChange}
            quantity={quantity}
      />
      }
    </div>
  );
};

export default App;
