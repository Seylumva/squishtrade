import styles from "./NavigationToggle.module.css";

const NavigationToggle = ({ setNavOpen, navOpen }) => {
  const navToggleClasses = navOpen
    ? `${styles["nav-toggle"]} ${styles["nav-toggle--open"]}`
    : styles["nav-toggle"];

  return (
    <button
      className={navToggleClasses}
      onClick={() => setNavOpen((state) => !state)}
    >
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </button>
  );
};

export default NavigationToggle;
