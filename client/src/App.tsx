import { useState } from "react";
import { useQuery } from "react-query";

import Product from "./pages/product";

import { CartItemType } from "./types";

const products = [
  {
    id: 1,
    name: "Small Pizza",
    price: 11.99,
    description: "10'' pizza for one person",
    currency: "$",
    quantity: 1,
  },

  {
    id: 2,
    name: "Medium Pizza",
    price: 15.99,
    description: "12'' Pizza for two persons",
    currency: "$",
    quantity: 1,
  },

  {
    id: 3,
    name: "Large Pizza",
    price: 21.99,
    description: "15'' Pizza for four persons",
    currency: "$",
    quantity: 1,
  },
];

const getProducts = async (): Promise<CartItemType[]> => await products;
// await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  // const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setItemQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    const productExist = cartItems
      .slice()
      .filter((cartItem) => cartItem.id === clickedItem.id);

    if (productExist.length > 0) {
      const newQuantityItem = productExist[0];
      newQuantityItem.quantity = quantity;
      const otherCartItems = cartItems
        .slice()
        .filter((cartItem) => cartItem.id !== clickedItem.id);
      setCartItems([...otherCartItems, newQuantityItem]);
      setItemQuantity(1);
    } else {
      const newData = clickedItem;
      newData.quantity = quantity;
      setCartItems([...cartItems, newData]);
      setItemQuantity(1);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
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
    setItemQuantity(() => quantity);
  };

  if (isLoading) return <div>Loading.......</div>;
  if (error) return <div>Something went wrong ...</div>;

  console.log(cartItems);

  return (
    <div>
      {isLoading ? (
        <div>Loading.......</div>
      ) : (
        <Product
          products={data}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handleInputChange={handleInputChange}
          quantity={quantity}
        />
      )}
    </div>
  );
};

export default App;
