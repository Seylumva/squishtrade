import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";

const SignOutButton = ({ name, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (name) {
      toast.info(`See you later, ${name}!`);
    }
    dispatch(logout());
    navigate("/");
  };
  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default SignOutButton;
