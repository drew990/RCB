import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCursiveWriting from "../../images/Hero/HeroCursiveWriting.png";
import Logo from "../../images/Hero/HeroLogo.png";
import styles from "../../styles/Home.module.css";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.flexColumn}>
        <div className={styles.heroImgSize}>
          <div className={styles.heroLogoImgSize}>
            <Image src={Logo} alt="Logo" />
          </div>
          <div className={styles.heroWritingImgLogoSize}>
            <Image src={HeroCursiveWriting} alt="Logo" />
          </div>
        </div>

        <div style={{ width: "45%", margin: "0 auto" }}>
          <Link href="/Products">
            <button
              id="home-button"
              className={styles.blackButton}
              style={{ padding: "1rem", width: "100%" }}
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
