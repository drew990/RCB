import Image from "next/image";
import React from "react";
import Renett from "../images/renett.png";
import styles from "../styles/Home.module.css";

function AboutMe() {
  return (
    <div className={styles.aboutCandlesBackground}>
      <div className={styles.aboutMeContainer}>
        <div
          className={`${styles["aboutFlex1"]} ${styles["about-text-container"]}`}
        >
          <h2>About Me</h2>
          <p>
            I've always loved candles! Besides the pleasant aromas that fill the
            air of your home, there is something calming about them. During what
            was the most challenging time in the world, a global pandemic, we
            all had to stop, slow down, and reflect on what was most important
            to us, our health and families. We each had to look into our inner
            selves and find a passion and purpose to the madness.
          </p>
          <br />
          <p>
            Making candles was always something I wanted to try. As I began to
            experiment, I have learned and continue to learn more about candle
            making. I put thought and care into the products being used to give
            you assurance that the candles being burned in your home are safer
            than other products. Using 100% soy wax, eco friendly wicks made of
            cotton, and fragrance scents that are phthalate-free.
          </p>
          <br />
          <p>
            I have found my passion and hope that you can also find yours. May
            you enjoy burning your candles and remember that you are powerful
            and brilliant!
          </p>
          <br />
          <p style={{ fontWeight: "bold" }}>"Let Your Brilliance Shine"</p>
        </div>
        <div className={styles.aboutFlex2} style={{ textAlign: "center" }}>
          <div className={styles.aboutFlexImg2}>
            <Image
              src={Renett}
              alt="Filler Pic"
              // width="74%"
              // height="100%"
              layout="responsive"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
