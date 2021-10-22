import { useState } from "react";
import { useQuery } from "react-query";

import Product from "./pages/product";

import { CartItemType } from "./types";

const getProducts = async (): Promise<CartItemType[]> => {
  let resp = await (await fetch("http://localhost:9000/v1/products", {
    method: "GET",
  })).json();
  return resp.data;
};

const getCustomerName = (): string => {
  const items = ["Amazon", "Default", "Facebook", "Microsoft"];
  return items[Math.floor(Math.random() * items.length)] || "Default";
};

const App = () => {
  // const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setItemQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [total, setTotalCartPrice] = useState(0);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts,
  );
  const { data: customerName, isLoading: customerNameLoading } = useQuery(
    "customerName",
    getCustomerName,
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

  const getCartTotal = async () => {
    const body = {
      cartItems,
      customerName
    };

    let resp =
      await (await fetch("http://localhost:9000/v1/products/checkout", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
      })).json();
    
    setTotalCartPrice(resp.data.total)
  };

  if (isLoading) return <div>Loading.......</div>;
  if (error) return <div>Something went wrong ...</div>;

  console.log(cartItems, customerName);

  return (
    <div>
      {isLoading || customerNameLoading
        ? (
          <div>Loading.......</div>
        )
        : (
          <Product
            products={data}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            handleInputChange={handleInputChange}
            quantity={quantity}
            customerName={customerName || ""}
            getCartTotal={getCartTotal}
            totalPrice={total}
          />
        )}
    </div>
  );
};

export default App;
