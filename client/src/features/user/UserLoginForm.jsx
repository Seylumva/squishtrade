import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "./userSlice";
import Page from "../../components/Page";
import styles from "./UserForm.module.css";
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
      toast.success(`Welcome! ${user.name}!`);
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
      <Page title="Login" caption="Sign in to get started" fluid={false}>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <button>Sign In</button>
          </div>
        </form>
      </Page>
    </>
  );
};

export default UserLoginForm;
