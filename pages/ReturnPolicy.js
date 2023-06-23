import Head from 'next/head';
import React from 'react';

import styles from '../styles/Home.module.css';

function ReturnPolicy() {
  return (
    <div className={`${styles['aboutMeContainer']}  `}>
      <Head>
        <title>RCBrilliance - Return Policy</title>
        <meta name="description" content="RCBrilliance Return Policy Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles['about-text-container']}`}>
        <h1>RETURN POLICY</h1>
        <br />
        <p>
          In the event you are not completely satisfied with your purchase for
          any reason, you may return it to us for an exchange or refund. All
          returns must be postmarked within fourteen (14) days of the purchase
          date. All returned items must be in new and unused condition.
        </p>
        <br />
        <p>
          <p style={{ fontWeight: 'bold' }}>Return Process:</p>To return an
          item, please email customer service at rcbrilliance@gmail.com with a
          brief explanation of product defect, damage, or dislike. Once email is
          received and product issue is determined, instructions for return,
          exchange, or refund will be provided.
        </p>
        <p>
          <p style={{ fontWeight: 'bold' }}>Please note:</p> You will be
          responsible for all return shipping charges. We strongly recommend
          that you use a trackable method to mail your return.
        </p>
        <br />
        <p>
          After receiving your return and inspecting the condition of your item,
          and after our approval of the requested refund, we will process your
          return or exchange. Please allow at least seven (7) days from the
          receipt of your item to process your return or exchange. We will
          notify you by email when your return has been processed.
        </p>
        <br />
        <p>
          <p style={{ fontWeight: 'bold' }}>Questions:</p>If you have any
          questions concerning our return policy, please contact us at:
          rcbrilliance@gmail.com.
        </p>
      </div>
    </div>
  );
}

export default ReturnPolicy;
