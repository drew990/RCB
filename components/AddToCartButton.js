import React from 'react';
import { NotificationManager } from 'react-notifications';

function AddToCartButton({ productID }) {
  function addToCart(e) {
    e.preventDefault();
    // Gets product ID and keeps it in local storage
    if (orders != null) {
      setOrders([...orders, e.target.value]);
    } else {
      setOrders([e.target.value]);
    }
    NotificationManager.success('Successfully Added to Cart!', 'Success', 2000);
    // localStorage.setItem("cart", JSON.stringify(orders));
  }

  return (
    <button onClick={addToCart} value={productID}>
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
