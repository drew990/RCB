import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import insta from '../../images/insta.png';
import styles from '../../styles/Home.module.css';

export default function footer() {
  return (
    <footer>
      <section
        className={`${styles.container} ${styles.flex}`}
        style={{ width: '100%', textAlign: 'center' }}
      >
        <div>
          <h4>Navigation</h4>
          <Link href="/">
            <p className={styles.links}>Home</p>
          </Link>
          <Link href="/Products">
            <p className={styles.links}>Products</p>
          </Link>
          <Link href="/CandleCare">
            <p className={styles.links}>Candle Care</p>
          </Link>
          <Link href="/AboutMe">
            <p className={styles.links}>About Us</p>
          </Link>
          <Link href="/Contact">
            <p className={styles.links}>Contact</p>
          </Link>
        </div>
      </section>
      <div className={styles.whiteDivider} style={{ opacity: '0.5' }} />
      <div className={styles.container} style={{ textAlign: 'center' }}>
        <div>
          <h4>Follow Me On</h4>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.sociallinks}
          >
            <a
              href="https://www.instagram.com/rcbrilliance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={insta} alt="Instagram" layout="responsive" />
            </a>
          </motion.div>
        </div>
        <div className={styles.policy}>
          <Link href="/Terms">
            <p className={styles.links}>Terms and Condition</p>
          </Link>
          <Link href="/ReturnPolicy">
            <p className={styles['links'] + ' ' + styles['refundLinks']}>
              Return Policy
            </p>
          </Link>
          <Link href="/ShippingPolicy">
            <p className={styles.links}>Shipping Policy</p>
          </Link>
        </div>
        &copy;{new Date().getFullYear()} by RCBrilliance Inc.
        <p style={{ marginTop: '16px' }}>
          Made by&nbsp;
          <a href="https://github.com/drew990" className={styles.links}>
            Andrew Banagas
          </a>
        </p>
      </div>
    </footer>
  );
}
