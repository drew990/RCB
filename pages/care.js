import Head from 'next/head';
import React from 'react';

import CandleCareCom from '../components/CandleCare';

function Care() {
  return (
    <div>
      <Head>
        <title>RCBrilliance - Candle Care</title>
        <meta name="description" content="RCBrilliance Candle Care Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CandleCareCom />
    </div>
  );
}

export default Care;
