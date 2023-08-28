import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, increaseCartItemQuantity, decreaseCartItemQuantity } from '../store/actions';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, increaseCartItemQuantity, decreaseCartItemQuantity }) => {
  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.name} className="cart-item">
            <img src={item.url} alt={item.title} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <button onClick={() => increaseCartItemQuantity(item)}>+</button>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => decreaseCartItemQuantity(item)}>-</button>
              <button onClick={() => removeFromCart(item.name)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-cost">
        <p>Total Cost: ${calculateTotalCost()}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
});

const mapDispatchToProps = {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
