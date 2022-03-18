import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import SignInOptions from "./SignInOptions";
const Navigation = ({ navOpen, closeNav }) => {
  const { user } = useSelector((state) => state.user);
  const navClasses = navOpen
    ? `${styles.nav} ${styles["nav--visible"]}`
    : styles.nav;

  return (
    <nav className={navClasses}>
      <ul className="nav__links">
        <li className="nav__item">
          <Link to="/" className="nav__link" onClick={closeNav}>
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/listings" className="nav__link" onClick={closeNav}>
            Listings
          </Link>
        </li>
        {user ? (
          <li>
            <Link
              to="profile"
              className={styles["profile-link"]}
              onClick={closeNav}
            >
              Profile ({user.name})<div className={styles["fake-avatar"]}></div>
            </Link>
          </li>
        ) : (
          <SignInOptions closeNav={closeNav} />
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
