import React from "react";
import ContactForm from "../components/ContactForm";
import styles from "../styles/Home.module.css";

function contact() {
  return (
    <div className={styles.contactBackground}>
      <ContactForm />
    </div>
  );
}

export default contact;
