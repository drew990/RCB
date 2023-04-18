import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

function Cart() {
  const [orders, setOrders] = useState();
  const [displayOrders, setDisplayOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // const item = "Hello";
    const data = window.localStorage.getItem("cart");
    const items = JSON.parse(data);
    setOrders(items);
  }, []);

  // console.log("Your Orders is:", orders);

  // Handles order Changes
  useEffect(() => {
    async function callAPI(orders) {
      console.log("API CALLED");
      console.log("ID PASSED", orders);

      try {
        const res = await fetch(`http://localhost:3000/api/customerOrder`, {
          method: "POST",
          body: JSON.stringify({ orders }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("data", data);
        setDisplayOrders(data);
      } catch (err) {
        console.log(err);
      }
    }

    // Calls API
    callAPI(orders);
  }, [orders]);

  function convertPrice(amount) {
    return amount / 100;
  }

  if (displayOrders.length > 0) {
    console.log("Orders", displayOrders[0]);
  }
  return (
    <div className={styles.cartBackground}>
      <div className={`${styles["cartConatiner"]} ${styles["cartFlex"]}`}>
        <div className={styles.cartFlexSize1}>
          <h1>Your Shopping Cart</h1>
          <div className={styles.flex}>
            <div className={`${styles["flex"]} ${styles["fullWidth"]}`}>
              <h3>Product</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </div>

            {displayOrders.map((displayOrder) => (
              <div
                className={`${styles["flex"]} ${styles["fullWidth"]}`}
                key={displayOrder.id}
              >
                <div className={styles.cartFlexOrder}>
                  <p>
                    {displayOrder.itemData.name} <br />
                  </p>
                </div>
                <p className={styles.cartFlexOrder}>
                  $
                  {convertPrice(
                    displayOrder.itemData.variations[0].itemVariationData
                      .priceMoney.amount
                  )}
                </p>
                <p className={styles.cartFlexOrder}>Quantity</p>
                <p className={styles.cartFlexOrder}>Total</p>
              </div>
            ))}
          </div>
        </div>
        <aside className={`${styles["cartAside"]} ${styles["cartFlexSize2"]}`}>
          <h2>Shopping Cart Subtotal</h2>
          <h3>$15.00</h3>
          <p>SHIPPING & TAXES WILL BE CALCULATED AT CHECKOUT</p>
          <button>Checkout</button>
        </aside>
      </div>
    </div>
  );
}

export default Cart;

// <div className={styles.flex}>
//   <h3>{}</h3>
//   <h3>Price</h3>
//   <h3>Quantity</h3>
//   <h3>Total</h3>
// </div>
