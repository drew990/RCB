import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';

import Trash from '../images/cancel.png';
import styles from '../styles/Home.module.css';

export default function Cart() {
  const router = useRouter();

  const [orders, setOrders] = useState();
  const [displayOrders, setDisplayOrders] = useState([]);

  // VALUES FROM INPUT FORM
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [state, setState] = useState('');
  // const [address, setAddress] = useState('');
  // const [aptNum, setAptNum] = useState('');
  // const [city, setCity] = useState('');
  // const [zipCode, setZipCode] = useState('');
  // const [phoneNum, setPhoneNum] = useState('');

  let totalCost = 0;
  const shippingCost = 7;
  let totalPrice = 0;

  const idempotency = uuidv4();

  useEffect(() => {
    // const item = "Hello";
    const data = window.localStorage.getItem('cart');
    const items = JSON.parse(data);
    setOrders(items);
  }, []);

  // Handles order Changes
  useEffect(() => {
    async function callAPI(orders) {
      // console.log("API CALLED");
      // console.log("ID PASSED", orders);

      try {
        const res = await fetch(
          `https://www.rcbrilliance.com/api/customerOrder`,
          {
            method: 'POST',
            body: JSON.stringify({ orders }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await res.json();
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

  function removeItem(e) {
    e.preventDefault();
    NotificationManager.success(
      'Successfully Remove Item from Cart',
      'Remove Entire Item From Cart',
      2000
    );
    // Gets ID to remove Item
    const productId = e.target.id;
    let storage = JSON.parse(window.localStorage.cart);

    // Deletes ID that was given
    delete storage[productId];

    // Re-Enters in data into local storage
    localStorage.setItem('cart', JSON.stringify(storage));
    // Reloads Page to give the updated cart
    location.reload();
  }

  // Gets product quantity and price then returns total
  function getProductTotal(quantity, price) {
    return Number(quantity * price) / 100;
  }

  function taxesPrice(totalCost) {
    return ((totalCost * 0.095) / 100).toFixed(2);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sends Data to Square and receives link to payment
    const response = await fetch('/api/sendOrder', {
      method: 'POST',
      body: JSON.stringify({
        // firstName: firstName,
        // lastName: lastName,
        // email: email,
        // address: address,
        // aptNum: aptNum,
        // city: city,
        // state: state,
        // zipCode: zipCode,
        // phoneNum: phoneNum,
        idempotency: idempotency,
        orderIds: orders,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data.paymentLink.url);
    router.push(data.paymentLink.url);
  };

  return (
    <div className={styles.cartBackground}>
      <Head>
        <title>RCBrilliance - Cart</title>
        <meta name="description" content="RCBrilliance Cart Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {displayOrders != 0 ? (
        <div className={`${styles['cartConatiner']} ${styles['cartFlex']}`}>
          <div className={styles.cartFlexSize1}>
            <div className={styles.flex}>
              <div className={`${styles['flex']} ${styles['fullWidth']}`}>
                <h3>Product</h3>
                <h3>Price</h3>
                <h3>Quantity</h3>
                <h3>Total</h3>
                <h3>Remove</h3>
              </div>

              {displayOrders.map((displayOrder) => {
                totalCost =
                  totalCost +
                  Number(
                    displayOrder.itemData.variations[0].itemVariationData
                      .priceMoney.amount
                  ) *
                    orders[displayOrder.id].Quantity;
                return (
                  <div
                    className={`${styles['flex']} ${styles['fullWidth']} ${styles['checkout_flex']}`}
                    key={displayOrder.id}
                  >
                    <div className={styles.cartFlexOrder}>
                      <Image
                        src={displayOrder.itemData.imageIds.imageData.url}
                        alt="Image Here"
                        layout="fixed"
                        width={150}
                        height={150}
                      />
                      <h3>
                        {displayOrder.itemData.name} <br />
                      </h3>
                    </div>
                    <h3 className={styles.cartFlexOrder}>
                      $
                      {convertPrice(
                        displayOrder.itemData.variations[0].itemVariationData
                          .priceMoney.amount
                      )}
                    </h3>
                    <h4 className={styles.cartFlexOrder}>
                      {orders[displayOrder.id].Quantity}
                    </h4>
                    <h3 className={styles.cartFlexOrder}>
                      <div className={styles.cartNumFlex}>
                        $
                        {getProductTotal(
                          orders[displayOrder.id].Quantity,
                          displayOrder.itemData.variations[0].itemVariationData
                            .priceMoney.amount
                        )}
                      </div>
                    </h3>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={styles.cartFlexOrder}
                    >
                      <Image
                        src={Trash}
                        alt="Delete"
                        layout="fixed"
                        width={30}
                        height={30}
                        onClick={removeItem}
                        id={displayOrder.id}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
          <aside
            className={`${styles['cartAside']} ${styles['cartFlexSize2']}`}
          >
            <div className={styles.cartAsideText}>
              <h2>Your Shopping Cart</h2>
              <h3>Subtotal: ${convertPrice(totalCost)}</h3>
              <h3>Taxes: ${taxesPrice(totalCost)}</h3>
              <h3
                style={{
                  borderBottom: '2px solid',
                  width: '40%',
                  marginBottom: '0.5rem',
                }}
              >
                Shipping: ${shippingCost}
              </h3>
              <h3 style={{ marginBottom: '0.5rem' }}>
                Total: $
                {(totalPrice =
                  Number(convertPrice(totalCost)) +
                  Number(taxesPrice(totalCost)) +
                  shippingCost).toFixed(2)}
              </h3>
              <form
                style={{ width: '100%' }}
                onSubmit={handleSubmit}
                className={styles.checkoutForm}
              >
                {/* <h3 style={{ textAlign: "center" }}>Enter Shipping Address</h3>
                <div>
                  <label for="fname">First Name</label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="First Name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="lname">Last Name</label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Last Name..."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="lname">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="faddress">Address</label>
                  <input
                    type="text"
                    id="faddress"
                    name="faddress"
                    placeholder="Address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="Aaddress">Apt #</label>
                  <input
                    type="text"
                    id="Aaddress"
                    name="Aaddress"
                    placeholder="Apt #..."
                    value={aptNum}
                    onChange={(e) => setAptNum(e.target.value)}
                  />
                </div>
                <div>
                  <label for="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="Zipcode">Zip Code</label>
                  <input
                    type="text"
                    id="Zipcode"
                    name="Zipcode"
                    placeholder="Zip Code..."
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State..."
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label for="PhoneNum">Phone #</label>
                  <input
                    type="text"
                    id="PhoneNum"
                    name="PhoneNum"
                    placeholder="Phone #..."
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    required
                  />
                </div> */}
                <div
                  style={{
                    width: '110%',
                    margin: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* <Link href="/Products"> */}
                  <button type="submit" className={styles.blackButton}>
                    Checkout
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>
          </aside>
        </div>
      ) : (
        <div
          className={styles.cartConatiner}
          style={{
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '700px ',
            width: '100%',
          }}
        >
          <h1 style={{ paddingBottom: '2rem' }}>
            Sorry! There&apos;s No Items In Your Shopping Cart
          </h1>
          <h2 style={{ paddingBottom: '2rem' }}>Add Some To Your Cart</h2>
          <button>Shop Now</button>
        </div>
      )}
    </div>
  );
}
