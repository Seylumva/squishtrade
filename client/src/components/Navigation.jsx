import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import SignInOptions from "./SignInOptions";
import SignOutButton from "./SignOutButton";
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
        {user && (
          <li>
            <Link to="profile" onClick={closeNav}>
              Profile
            </Link>
          </li>
        )}
        {user ? (
          <SignOutButton name={user.name} closeNav={closeNav} />
        ) : (
          <SignInOptions closeNav={closeNav} />
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
