import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // ✅ TOTAL CART AMOUNT
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.cost.substring(1));
      return total + price * item.quantity;
    }, 0);
  };

  // ✅ SUBTOTAL PER ITEM
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return price * item.quantity;
  };

  // ✅ CONTINUE SHOPPING
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ CHECKOUT (as per instruction)
  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  // ✅ INCREMENT
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  // ✅ DECREMENT
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // ✅ REMOVE ITEM
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  return (
    <div className="cart-container">

      <h2>🛒 Shopping Cart</h2>

      <button onClick={handleContinueShopping}>
        Continue Shopping
      </button>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>

          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">

              <img src={item.image} alt={item.name} width="100" />

              <div>
                <h3>{item.name}</h3>
                <p>Price: {item.cost}</p>

                <p>
                  Subtotal: ${calculateTotalCost(item)}
                </p>

                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button onClick={() => handleRemove(item)}>
                  Remove
                </button>

              </div>

            </div>
          ))}

          <h3>Total: ${calculateTotalAmount()}</h3>

          <button onClick={handleCheckoutShopping}>
            Checkout
          </button>

        </div>
      )}
    </div>
  );
}

export default CartItem;
