import React from "react";
import styles from "../styles/ComingSoon.module.css";
import insta from "../images/insta.png";
import Image from "next/image";
import Logo from "../images/Logo/logo.png";
import { motion } from "framer-motion";
// import backgroundVideo from "../images/Vid/BackgroundVideo.mp4";
import ReactPlayer from "react-player";

function ComingSoon() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className={styles.flex}>
      <div className={`  ${styles["comingSoonBackground"]}`}>
        <div className={styles.textBox}>
          <div className={`${styles["LogoHover"]}`}>
            <Image src={Logo} width={165} height={85} />
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={styles.flex}
          >
            {["Soothing", "Candles", "Coming ", "Soon..."].map((index) => (
              <motion.h1 key={index} variants={item}>
                {index}
              </motion.h1>
            ))}

            {/* <h1> </h1>
            <h1> </h1> */}
          </motion.div>
          <p style={{ marginTop: "16px" }}>
            Made by&nbsp;
            <a href="https://github.com/drew990" className={styles.links}>
              Andrew Banagas
            </a>
          </p>
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
      </div>
    </div>
  );
}

export default ComingSoon;
