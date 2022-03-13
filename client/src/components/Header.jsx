import styles from "./Header.module.css";
import { useState } from "react";
import NavigationToggle from "./NavigationToggle";
import Navigation from "./Navigation";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => {
    setNavOpen((state) => !state);
  };
  return (
    <header className={styles.header}>
      <div className={styles["container-row"]}>
        <h1 className={styles.title}>MERN App Template</h1>
        <Navigation navOpen={navOpen} closeNav={closeNav} />
        <NavigationToggle navOpen={navOpen} setNavOpen={setNavOpen} />
      </div>
    </header>
  );
};

export default Header;
