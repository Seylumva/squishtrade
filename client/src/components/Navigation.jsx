import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import SignInOptions from "./SignInOptions";
import { Image, Transformation } from "cloudinary-react";
import { refreshUserData } from "../features/user/userSlice";
import { useEffect } from "react";

const Navigation = ({ navOpen, closeNav }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Runs once when the page is first opened or refreshed to
  // update the user state from the server across other devices
  useEffect(() => {
    if (user) {
      dispatch(refreshUserData());
    }
    // eslint-disable-next-line
  }, [dispatch]);

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
              Profile ({user.name})
              <Image
                cloudName="seylumva"
                publicId={user.avatarUrl}
                style={{ borderRadius: "50%" }}
              >
                <Transformation width="35" height="35" crop="fill" />
              </Image>
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
