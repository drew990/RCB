import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Filler from '../images/FillerAbout.jpg';
import styles from '../styles/Home.module.css';

export default function Experience() {
  return (
    <div className={styles.aboutExperienceBackground}>
      <div className={`${styles['container']} ${styles['flexRow']}`}>
        <div className={styles.imgContainerAbout}>
          <Image src={Filler} alt="Experience" layout="responsive" />
        </div>
        <div
          className={styles.aboutCandlesTextContainer}
          style={{ textAlign: 'center' }}
        >
          <h1>Experience</h1>
          <p>
            I&apos;m here to make sure you get the best of the best when it
            comes to scented candles. My top priority is to give you a memorable
            experience that you&apos;ll never forget. I also want to make sure
            that you have all the info you need to keep your candles in top
            condition and to learn about the latest techniques for getting the
            most out of them.
          </p>
          <Link href="/CandleCare">
            <button className={styles.whiteButton}> Candle Care Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
