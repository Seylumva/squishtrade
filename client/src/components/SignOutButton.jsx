import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";

const SignOutButton = ({ name, closeNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (closeNav) {
      closeNav();
    }
    if (name) {
      toast.info(`See you later, ${name}!`);
    }
    dispatch(logout());
    navigate("/");
  };
  return (
    <button
      className="nav__link"
      onClick={handleLogout}
      style={{
        padding: "0.5em",
        background: "#bb0000",
        color: "whitesmoke",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default SignOutButton;
