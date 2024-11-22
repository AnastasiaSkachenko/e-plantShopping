import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.js';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({onContinueShopping} ) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.items);
  console.log(cart, 'cart')
  console.log(cart)

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    if (cart.length !== 0) {
      console.log(cart)
      const total = cart.reduce((total, item) => total + item.quantity * item.cost.slice(1), 0)
      
      return total
    } else {
      return 0
    }
  };

 
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({name:item.name, quantity:item.quantity + 1}))
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({name:item.name, quantity:item.quantity - 1}))
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  };
 
  const calculateTotalCost = (item) => {
    const total = item.cost.slice(1) * item.quantity
    return total

  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button onClick={handleCheckoutShopping} className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};
export default CartItem;


