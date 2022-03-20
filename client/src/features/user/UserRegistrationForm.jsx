import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "./userSlice";
import { Helmet } from "react-helmet-async";
import Spinner from "../../components/Spinner";

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const { user, status, message } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (status === "error") {
      toast.error(message);
    }
    if (status === "success") {
      toast.success(`Welcome! ${user.name}!`);
      navigate(`/`);
    }
    dispatch(reset());
  }, [status, message, navigate, user, dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("You must provide all fields.");
      return;
    }
    dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
    setFormData({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === "loading") {
    return <h3>Loading...</h3>;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Register | Squishtrade</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 w-full pt-12">
        <h2 className="text-center text-3xl font-medium mb-12">Register</h2>
        <form
          onSubmit={handleRegister}
          className="max-w-sm flex flex-col items-center mx-auto gap-3"
        >
          <input
            type="text"
            placeholder="Full name"
            className="input input-bordered w-full"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
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
          <input
            className="input input-bordered w-full"
            placeholder="Password"
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleInputChange}
            required
          />
          <button className="btn btn-block">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default UserRegistrationForm;
