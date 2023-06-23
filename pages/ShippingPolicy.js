import Head from 'next/head';
import React from 'react';

import styles from '../styles/Home.module.css';

function ShippingPolicy() {
  return (
    <div className={`${styles['aboutMeContainer']}  `}>
      <Head>
        <title>RCBrilliance - Shipping Policy</title>
        <meta name="description" content="RCBrilliance Shipping Policy Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles['about-text-container']}`}>
        <h1>SHIPPING POLICY</h1>
        <br />
        <p style={{ fontStyle: 'italic' }}>
          Currently, shipping is only available in the USA. International
          shipping is not available at this time.
        </p>
        <br />
        <p>
          <p style={{ fontWeight: 'bold' }}>Processing Time:</p> Orders are
          processed within 2-3 business days excluding weekends and holidays.
          Once the item has been handed to the delivery carrier, a tracking
          number will be sent to the customer.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Cancellations:</p> After an order
          and payment have been submitted, processing begins and order can not
          be cancelled. If you have any questions on cancelling an order, please
          email rcbrilliance@gmail.com within 24 hours.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Returns:</p> Returns will be
          accepted within 14 days or original purchase date. All return
          inquiries must be emailed to recbrilliance.com. Please see Return
          Policy for more details.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Shipping Time Frame:</p> North
          America: 5-7 business days once packaged has been handed to delivery
          carrier. Please Note: This is a shipping estimate, but cannot be
          guaranteed. Actual delivery time will depend on the postal service.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Damaged Orders:</p> RCBrilliance is
          not responsible for lost or damaged products after the order has been
          placed in the hands of the delivery carrier. If your product has
          arrived damaged, reach out to us so that we may assist you in filing a
          claim with the shipping carrier.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Shipping Restrictions:</p> Orders
          cannot be shipped to P.O. Boxes. Orders are only shipped in the USA.
          International shipping is not available at this time.
        </p>
      </div>
    </div>
  );
}

export default ShippingPolicy;
