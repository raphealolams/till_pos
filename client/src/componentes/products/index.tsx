import React from "react";
import { ProductItemProps } from "../../types";
const ProductItem: React.FC<ProductItemProps> = ({
  id,
  name,
  price,
  description,
  currency,
  addToCart,
  quantity,
  handleInputChange,
}) => {
  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{description}</p>
        <h5 className="card-text">
          <small>price:</small>
          {currency}
          {price}
        </h5>
        <div>
          <button
            className="btn btn-sm btn-warning float-right"
            onClick={() =>
              addToCart({ name, price, description, currency, id, quantity })
            }
          >
            Add to cart
          </button>
          <input
            type="number"
            defaultValue={quantity}
            name="quantity"
            onChange={(e) => handleInputChange(parseInt(e.target.value))}
            className="float-right"
            style={{
              width: "60px",
              marginRight: "10px",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
