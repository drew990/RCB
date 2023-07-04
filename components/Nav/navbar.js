// import cartImg from "../../images/cart.png";
import { motion } from 'framer-motion';
import { Spin as Hamburger } from 'hamburger-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Logo from '../../images/Logo/logo.png';
import about from '../../images/NavLogos/about.png';
import basket from '../../images/NavLogos/basket.png';
import candle from '../../images/NavLogos/candle.png';
import form from '../../images/NavLogos/form.png';
import help from '../../images/NavLogos/help.png';
import styles from '../../styles/Home.module.css';

// import { MdOutlineShoppingCart } from "react-icons/md";
// import commerce from "../lib/commerce";

const AppNavbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    // const handleResize = () => {
    //   if (window.innerWidth > 767) {
    //     setShowMobileNavMenu(false);
    //     setMobileNavOpen(false);
    //   } else if (window.innerWidth < 767) {
    //     setShowMobileNavMenu(true);
    //   }
    // };

    // Sets Nav in Mobile View
    if (window.innerWidth < 767) {
      setShowMobileNavMenu(true);
    }
    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  useEffect(() => {
    // console.log("NAV LISTENING");
    const handleLocalStorage = () => {
      // console.log("In handlelocalstorage");

      let items = JSON.parse(localStorage.getItem('cart'));
      // console.log("ITEMS:", items);

      if (items != null) {
        let productInCartNum = 0;

        for (const [key, value] of Object.entries(items)) {
          productInCartNum = productInCartNum + value.Quantity;
        }

        setCart(productInCartNum);
      }
    };

    window.addEventListener('storage', handleLocalStorage());
    // return () => window.removeEventListener("storage", handleLocalStorage());
  }, []);

  return (
    <nav>
      <Link onClick={() => setOpen(false)} href="/">
        <div className={`${styles['LogoHover']}`}>
          <Image src={Logo} width={85} height={45} alt="RCBrilliance Logo" />
        </div>
      </Link>

      {showMobileNavMenu ? (
        <div>
          <div>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
          {isOpen ? (
            <motion.ul
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'just' }}
            >
              <li>
                <Link href="/Products">
                  <motion.h4
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(false)}
                  >
                    <Image src={candle} alt="cart" width={20} height={20} />
                    Products
                  </motion.h4>
                </Link>
              </li>
              <li>
                <Link href="/CandleCare">
                  <motion.h4
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(false)}
                  >
                    <Image src={help} alt="cart" width={20} height={20} />
                    Candle Care
                  </motion.h4>
                </Link>
              </li>
              <li>
                <Link href="/AboutMe">
                  <motion.h4
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(false)}
                  >
                    <Image src={about} alt="cart" width={20} height={20} />
                    About
                  </motion.h4>
                </Link>
              </li>
              <li>
                <Link href="/Contact">
                  <motion.h4
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(false)}
                  >
                    <Image src={form} alt="cart" width={20} height={20} />
                    Contact
                  </motion.h4>
                </Link>
              </li>
              <li>
                <Link href="/Cart">
                  <motion.h4
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setOpen(false)}
                  >
                    <Image src={basket} alt="cart" width={20} height={20} />
                    Cart
                  </motion.h4>
                </Link>
              </li>
            </motion.ul>
          ) : (
            ''
          )}
        </div>
      ) : (
        <section>
          <Link href="/Products">Products</Link>
          <Link href="/CandleCare">Candle Care</Link>
          <Link href="/AboutMe">About</Link>
          <Link href="/Contact">Contact</Link>
          <Link href="/Cart">
            Cart
            {/* <div style={{ position: "relative" }}>
              <div>
                <Image src={cartImg} alt="cart" width={25} height={25} />
                <div className={styles.cartItemDisplay}>
                  {cart != undefined ? <p>{cart}</p> : <p>False</p>}
                </div>
              </div>
             </div> */}
          </Link>
        </section>
      )}
      {/* {showMobileNavMenu ? (
        <>
          {isOpen ? (
            <>
              <Hamburger
                className={`${isOpen ? `${styles.mobileNav}` : ""}`}
                toggled={isOpen}
                toggle={setOpen}
                duration={0.8}
                rounded
              />
              <ul
                className={`${styles.flexColumn} ${
                  isOpen ? `${styles.hamburgerMenu} ${styles.openMenu}` : ""
                }`}
              >
                <Link onClick={() => setOpen(false)} href="/shop">
                  Shop
                </Link>
                <Link onClick={() => setOpen(false)} href="/about">
                  About
                </Link>
                <Link onClick={() => setOpen(false)} href="/contact">
                  Contact
                </Link>
                <Link onClick={() => setOpen(false)} href="/cart">
                  Cart
                </Link>
              </ul>
            </>
          ) : (
            <>
              <Hamburger
                rounded
                toggled={isOpen}
                toggle={setOpen}
                duration={0.8}
              />
              <ul
                className={`flex-column ${
                  isOpen ? "" : "hamburger-menu close-menu"
                }`}
              >
                <Link href="/shop">Shop</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </ul>
            </>
          )}
        </>
      ) : (
        <section>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">
            <div style={{ position: "relative" }}> */}
      {/* <MdOutlineShoppingCart size={"1.5em"} /> */}

      {/* <div className="cart-item-display">
                {cart.total_items != null ? <>{cart.total_items}</> : <>0</>}
              </div>
            </div>
          </Link>
        </section>
      )} */}
    </nav>
  );
};

export default AppNavbar;
