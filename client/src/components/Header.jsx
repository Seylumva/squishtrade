import styles from "./Header.module.css";
import { useState } from "react";
import NavigationToggle from "./NavigationToggle";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => {
    setNavOpen((state) => !state);
  };
  return (
    <header className={styles.header}>
      <div className={styles["container-row"]}>
        <Link to="/" className={styles.title}>
          Squishtrade
        </Link>
        <Navigation navOpen={navOpen} closeNav={closeNav} />
        <NavigationToggle navOpen={navOpen} setNavOpen={setNavOpen} />
      </div>
    </header>
  );
};

export default Header;
