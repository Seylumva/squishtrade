import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "./userSlice";
import { Helmet } from "react-helmet-async";
import Spinner from "../../components/Spinner";

const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { user, message, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(`Welcome, ${user.name}!`);
      navigate(`/`);
    }

    dispatch(reset());
  }, [status, message, navigate, user, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("You must provide all fields.");
      return;
    }
    dispatch(
      login({
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Login | Squishtrade</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 w-full pt-12">
        <h2 className="text-center text-3xl font-medium mb-12">Log In</h2>
        <form
          onSubmit={handleLogin}
          className="max-w-sm flex flex-col items-center mx-auto gap-3"
        >
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-block">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;
