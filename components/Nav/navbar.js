import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Logo from "../../images/Logo/Logo.png";
import Image from "next/image";
import basket from "../../images/cart.png";

// import { Spin as Hamburger } from "hamburger-react";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import commerce from "../lib/commerce";

const AppNavbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showMobileNavMenu, setShowMobileNavMenu] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [cart, setCart] = useState(0);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 767) {
  //       setShowMobileNavMenu(false);
  //       setMobileNavOpen(false);
  //     } else if (window.innerWidth < 767) {
  //       setShowMobileNavMenu(true);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    console.log("NAC");

    window.onstorage = (event) => {
      console.log(event.key);
    };

    // let data = JSON.parse(localStorage.getItem("cart"));
    // if (data != null) {
    //   console.log("NAV DATA", data.length);
    //   setCart(data.length);
    // }
    // setCart(0);
  }, []);

  // const handleToggle = () => {
  //   setNavbarOpen(!navbarOpen);
  // };

  return (
    <nav>
      <Link
        className={`${isOpen ? `${styles.mobileNav}` : ""} `}
        onClick={() => setOpen(false)}
        href="/"
      >
        <div className={`${styles["LogoHover"]}`}>
          <Image src={Logo} width={85} height={45} />
        </div>
      </Link>
      <section>
        <Link href="/Products">Products</Link>
        <Link href="/CandleCare">Candle Care</Link>
        <Link href="/AboutMe">About</Link>
        <Link href="/Contact">Contact</Link>
        <Link href="/Cart">
          <div style={{ position: "relative" }}>
            {/* <MdOutlineShoppingCart size={"1.5em"} /> */}
            <div>
              <Image src={basket} alt="cart" width={25} height={25} />
              <div className={styles.cartItemDisplay}>{cart}</div>
            </div>
          </div>
        </Link>
      </section>
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
