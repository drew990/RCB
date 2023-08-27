import Head from 'next/head';
import React from 'react';

import AboutMeCom from '../components/AboutMe';

function About() {
  return (
    <div>
      <Head>
        <title>RCBrilliance - About</title>
        <meta name="description" content="RCBrilliance About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AboutMeCom />
    </div>
  );
}

export default About;
