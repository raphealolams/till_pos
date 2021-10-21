import React from "react";
import { CartItemProps } from "../../types";
const CartItem: React.FC<CartItemProps> = ({
    name,
    price,
    quantity
}) => {
  return (
    <div className="card" style={{ marginBottom: "10px"}}>
			  <div className="card-body">
			    <h4 className="card-title">{name}</h4>
			    <h5 className="card-text"><small>price: </small>${price}</h5>
			    <span className="card-text text-success"><small>Quantity: </small>{quantity}</span>
			    
			    {/* <button className="btn btn-sm btn-warning float-right" onClick={() => this.props.remove(product)}>Remove from cart</button> */}

			  </div>
			</div>
  );
};

export default CartItem;
