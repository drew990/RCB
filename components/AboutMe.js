import Image from "next/image";
import React from "react";
import FillerPic from "../images/AboutCandles/aboutmycandles.jpg";
import styles from "../styles/Home.module.css";

function AboutMe() {
  return (
    <div className={styles.aboutCandlesBackground}>
      <div className={styles.aboutMeContainer}>
        <div className={styles.flexSize1} style={{ textAlign: "center" }}>
          <Image
            src={FillerPic}
            alt="Filler Pic"
            width="125%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
        <div className={styles.flexSize2}>
          <h2>About Me</h2>
          <p>
            All candles are made with care and love. I use 100% soy wax. Soy wax
            is the oil from soybeans. They are eco friendly and have a clean
            slow burn Wicks are cotton with no metal core. Fragrance scents are
            100% phthalate-free, which are chemicals used in hundreds of
            products and are linked to many health issues. Burning candles
            should be enjoyed without the worry about the safety for your home
            and family!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
