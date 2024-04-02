import Head from 'next/head';
import React from 'react';

import ContactForm from '../components/ContactForm';
import styles from '../styles/Home.module.css';

function contact() {
  return (
    <div className={styles.contactBackground}>
      <Head>
        <title>RCBrilliance - Contact</title>
        <meta name="description" content="RCBrilliance Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContactForm />
    </div>
  );
}

export default contact;
