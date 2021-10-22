
import ProductItem from "../../componentes/products";

import { Products } from "../../types";

export default function Product({
  products,
  addToCart,
  removeFromCart,
  handleInputChange,
  quantity,
  customerName
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
      <hr />
        <button className="btn btn-success float-right">
          Checkout
        </button>
      <br />
      <br />
      <br />
    </div>
  );
}
