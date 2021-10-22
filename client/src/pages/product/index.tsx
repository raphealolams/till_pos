
import ProductItem from "../../componentes/products";

import { Products } from "../../types";

export default function Product({
  products,
  addToCart,
  removeFromCart,
  handleInputChange,
  quantity,
  customerName,
  totalPrice,
  getCartTotal
}: Products) {
  return (
    <div className="container">
      <h3 className="card-title">List of Available Products</h3>
      <small className="card-title">Customer Name: {customerName}</small>

      <hr />
      {products?.map((product, index) => (
        <ProductItem
          name={product.name}
          description={product.description}
          id={product.id}
          price={product.price}
          currency={product.currency}
          addToCart={addToCart}
          handleInputChange={handleInputChange}
          quantity={product.quantity || quantity}
          key={index}
        />
      ))}
      <button className="btn btn-success center"
      onClick={() => getCartTotal()}>
        Checkout
      </button>

      
      {totalPrice ? <h3 className="float-right">
          Total Price: {totalPrice}
        </h3>: ""}
      <br />
      <br />
      <br />
    </div>
  );
}
