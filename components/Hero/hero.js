import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import HeroCursiveWriting from '../../images/Hero/HeroCursiveWriting.png';
import Logo from '../../images/Hero/HeroLogo.png';
import styles from '../../styles/Home.module.css';

export default function Hero() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });

      if (window.innerWidth > 900) {
        setWindowSize({
          height: 150,
          width: 600,
        });
      } else if (window.innerWidth > 700) {
        setWindowSize({
          height: 150,
          width: 600,
        });
      } else {
        setWindowSize({
          width: 350,
          height: 80,
        });
      }
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
  }, []);

  return (
    <header className={styles.hero}>
      <div className={styles.flexColumn}>
        <div className={styles.heroImgSize}>
          <div className={styles.heroLogoImgSize}>
            <Image src={Logo} alt="Logo" height={windowSize.height} />
            {/* </div>
          <div className={styles.heroWritingImgLogoSize}> */}
            <Image
              src={HeroCursiveWriting}
              alt="Written Logo"
              width={windowSize.width}
            />
          </div>
        </div>

        <div style={{ width: '45%', margin: '0 auto' }}>
          <Link href="/products">
            <button
              id="home-button"
              className={styles.blackButton}
              style={{ padding: '1rem', width: '100%' }}
            >
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.heroImgsize}>
        {/* <div style={{ alignSelf: "center" }}>
        <Image
          src={HeroImg}
          layout="responsive"
          objectFit="cover"
          width={400}
          height={500}
        />
      </div> */}
      </div>
    </header>
  );
}
