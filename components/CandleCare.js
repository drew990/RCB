import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Insta from "../images/insta.png";
import { motion } from "framer-motion";
// ICONS IMPORTED
import Caution from "../images/CandleCareIcons/caution.png";
import fireExt from "../images/CandleCareIcons/fire-extinguisher.png";
import inclination from "../images/CandleCareIcons/inclination.png";
import table from "../images/CandleCareIcons/table.png";
import time from "../images/CandleCareIcons/time.png";
import trim from "../images/CandleCareIcons/trim.png";

function CandleCare() {
  return (
    <div className={styles.candleCareBackground}>
      <h1>Candle Care</h1>
      <div className={styles.candleCaresContainer}>
        <div className={styles.flex}>
          <motion.div
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={trim}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>Wick should be trimmed to 1/4" each time you burn candle</li>
              <li>If wick is bent, straighten before lighting</li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={table}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>
                Burn candle on flat heat resistance surface away from flammable
                items
              </li>
              <li>
                To prevent tunneling, allow the candle to burn completely to
                edges of jar
              </li>
              <li>
                Extinguish a candle and trim wick if the flame becomes too high
                or flickers repeatedly
              </li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={time}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>
                On first use it is recommended to burn for at least 2 hours
              </li>
              <li>Recommended not to burn more than 4 hours at a time</li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={inclination}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>
                Straighten wick if wick bends after flame is put out to prevent
                uneven burn or carefully use a metal wick hook during burning
              </li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={Caution}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>Do NOT burn candle with lid on</li>
              <li>ALWAYS keep candle in sight when in use</li>
              <li>ALWAYS Keep away from items that can catch fire</li>
              <li>NEVER leave candle unattended</li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={fireExt}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>Use a snuffer or wick hook to blow out candles</li>
              <li>
                Be sure candle is completely cooled before putting lid back on
              </li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`${styles["flexRow"]} ${styles["candleCareTextContainer"]} ${styles["centerAdjustment"]}`}
          >
            <div className={styles.candleCareImg}>
              <Image
                src={Caution}
                alt="Image Here"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>
            <ul>
              <li>CAUTION: Candle container may become hot during burning</li>
              <li>ALWAYS keep candles out of reach from children and pets</li>
            </ul>
          </motion.div>
        </div>
        <h2>Enjoy!</h2>
      </div>
      {/* <div className={styles.candleCaresContainer}></div> */}
    </div>
  );
}

export default CandleCare;
