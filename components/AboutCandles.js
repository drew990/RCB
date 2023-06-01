import React from "react";
import aboutCandles from "../images/AboutCandles/aboutCandles.png";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function AboutCandles() {
  return (
    <div className={styles.aboutCandlesBackground}>
      {/* styles.flex styles.centerAdjustment */}
      <motion.div
        className={styles.aboutCandlesContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={`${styles["flexSize1"]}  `}
          style={{ textAlign: "center" }}
        >
          <div className={styles.imgContainerAbout}>
            <Image src={aboutCandles} alt="Filler Pic" layout="responsive" />
          </div>
        </div>
        <div
          className={`${styles["flexSize2"]} ${styles["aboutCandlesTextContainer"]}`}
        >
          <h1>About My Candles</h1>
          <p>
            Each hand poured candle is made with love and care! Empowering words
            for each scent are a reminder of everyone's beauty and the
            importance of self-care. We should all let our brilliance shine! and
            family!
          </p>

          <p>
            I want you to enjoy the relaxing scents in your home while knowing
            you are burning a safer product for your family! My products are
            made of:
          </p>
          <div>
            <ul className={styles.aboutCandles}>
              <li>
                <p style={{ fontWeight: "bold" }}>100% Soy Wax</p>
                Eco-friendly soy wax is made from the oil of soybeans that
                provides a clean slow burn.
              </li>
              <li>
                <p style={{ fontWeight: "bold" }}>Eco Friendly Wicks</p>
                Cotton wicks with no metal cores.
              </li>
              <li>
                <p style={{ fontWeight: "bold" }}>Safer Fragrance Oils</p>
                Scent oils that are 100% phthalate-free and exclude cancer
                causing chemicals. Safer for you to burn in your home.
              </li>
            </ul>
          </div>
          <Link href="/Products">
            <button>Shop My Candles</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default AboutCandles;
