import styles from "../styles/Home.module.css";

export default function ContactForm() {
  // const [state, handleSubmit] = useForm("xlezrzgy");
  // if (state.succeeded) {
  //   return <p>Thanks for joining!</p>;
  // }
  return (
    <form
      action="https://formspree.io/f/xlezrzgy"
      method="POST"
      className={styles.flexColumn}
    >
      {/* <label htmlFor="email">Email Address</label> */}
      <h2>Contact Us</h2>
      {/* <div className={styles.blackDivider} /> */}
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email..."
        required
      />
      {/* <ValidationError prefix="Email" field="email" errors={state.errors} /> */}

      {/* <label htmlFor="Name">Full Name</label> */}
      <input
        placeholder="Full Name..."
        id="Name"
        type="text"
        name="Name"
        required
      />

      {/* <label htmlFor="message">Message</label> */}
      <textarea
        placeholder="Whats your message?"
        id="message"
        name="message"
        required
      />
      {/* <ValidationError prefix="Message" field="message" errors={state.errors} /> */}
      {/* disabled={state.submitting} */}
      <button className={styles.blackButton} type="submit">
        Submit
      </button>
    </form>
  );
}
