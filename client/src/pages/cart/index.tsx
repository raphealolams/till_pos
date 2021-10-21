import { Link } from "react-router-dom";

import CartItem from "../../componentes/cart";

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

export default function Cart() {
  return (
    <div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr/>
				{
              products.map((product, index) => <CartItem
                  id={product.id}
                  name={product.name}
                //   remove={this.removeFromCart}
                  price={product.price}
                  quantity={product.quantity} 
                  key={index} />)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">${10}</span></h4><hr/></div>: ''}

				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				{/* <Link to="/checkout"><button className="btn btn-success float-right">Checkout</button></Link> */}
				<br/><br/><br/>
			</div>
  );
}
