import Head from 'next/head';
import React from 'react';

import styles from '../styles/Home.module.css';

function Terms() {
  return (
    <div className={`${styles['aboutMeContainer']}  `}>
      <Head>
        <title>RCBrilliance - Terms and Condition</title>
        <meta
          name="description"
          content="RCBrilliance Terms and Condition Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ marginTop: '4rem' }}
        className={`${styles['about-text-container']}`}
      >
        <h1>PURCHASE AND USE TERMS AND CONDITIONS</h1>
        <br />
        <p>
          Purchaser (“You”) agree to use all purchased products safely,
          according to all directions and warnings provided by RCBrilliance LLC,
          and according to any and all specifications and directions of
          manufacturer.
        </p>
        <br />
        <p>
          RCBrilliance LLC sells its merchandise only to individuals who can
          legally purchase and own such items in the particular jurisdiction
          where they reside. By ordering and purchasing merchandise from
          RCBrilliance LLC you represent that you are of legal age to purchase
          this merchandise and that this merchandise can be purchased and owned
          by you in your state, county, and/or city of residence.
        </p>
        <p style={{ fontWeight: 'bold' }}>
          FURTHERMORE, BY PURCHASING AND USING THIS PRODUCT, YOU SHALL AND DO
          HEREBY AGREE TO INDEMNIFY AND HOLD RCBRILLIANCE LLC FREE AND HARMLESS
          FROM ANY LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, FROM ANY
          THIRD-PARTY CLAIMS FOR DAMAGES AGAINST THEIR PROPERTY, AND FROM ANY
          LIABILITY WHATSOEVER ARISING OUT OF THE APPLICATION OR USE OF ANY
          PRODUCT. FURTHERMORE, RCBRILLIANCE LLC SHALL NOT BE RESPONSIBLE FOR
          ANY DAMAGE THAT MAY OCCUR DUE TO MISUSE OF ITS PRODUCTS OR RELATED
          DIRECTLY OR INDIRECTLY WITH CANDLE BURNING.
        </p>
      </div>
    </div>
  );
}

export default Terms;
