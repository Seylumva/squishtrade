import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";

const SignOutButton = ({ name, closeNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    closeNav();
    if (name) {
      toast.info(`See you later, ${name}!`);
    }
    dispatch(logout());
    navigate("/");
  };
  return (
    <li className="nav__item">
      <button className="nav__link" onClick={handleLogout}>
        Logout
      </button>
    </li>
  );
};

export default SignOutButton;
