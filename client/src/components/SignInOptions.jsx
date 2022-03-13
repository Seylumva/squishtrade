import { Link } from "react-router-dom";

const SignInOptions = ({ closeNav }) => {
  return (
    <>
      <li className="nav__item">
        <Link to="/register" className="nav__link" onClick={closeNav}>
          Register
        </Link>
      </li>
      <li className="nav__item">
        <Link to="/login" className="nav__link" onClick={closeNav}>
          Login
        </Link>
      </li>
    </>
  );
};

export default SignInOptions;
