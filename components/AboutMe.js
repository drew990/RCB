import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import Renett from '../images/renett.png';
import styles from '../styles/Home.module.css';

function AboutMe() {
  return (
    <div className={styles.aboutCandlesBackground}>
      <motion.div
        className={styles.aboutMeContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={`${styles['aboutFlex1']} ${styles['about-text-container']}`}
        >
          <h2>About Me</h2>
          <p>
            During what was the most challenging time in the world, a global
            pandemic, we all had to stop, slow down, and reflect on what was
            most important to us, our health and families. We each had to look
            into our inner selves and find a passion and purpose to the madness.
          </p>
          <br />
          <p>
            I&apos;ve always loved candles! Besides the pleasant aromas that
            fill the air of your home, there is something calming about them. By
            making candles, I have learned and continue to learn more about the
            art of candle making. So you can burn my candles with confidence,
            knowing that you&apos;re not only getting a beautiful scent, but
            also a product that&apos;s safer for you and your family. Using 100%
            soy wax, eco friendly wicks made of cotton, and fragrance scents
            that are phthalate-free.
          </p>
          <br />
          <p>
            I have found my passion and hope that you can also find yours. May
            you enjoy burning your candles and remember that you are powerful
            and brilliant!
          </p>
          <br />
          <p style={{ fontWeight: 'bold' }}>
            &quot;Let Your Brilliance Shine&quot;
          </p>
        </div>
        <div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
          className={styles.aboutFlex2}
          style={{ textAlign: 'center' }}
        >
          <div className={styles.aboutFlexImg2}>
            <Image
              src={Renett}
              alt="Owner Pic"
              // width="74%"
              // height="100%"
              layout="responsive"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutMe;
