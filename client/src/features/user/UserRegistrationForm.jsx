import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "./userSlice";
import Page from "../../components/Page";
import styles from "./UserForm.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Spinner from "../../components/Spinner";

const UserRegistrationForm = () => {
  useDocumentTitle("Register");
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
    <Page title="Register" caption="Sign up to get started" fluid={false}>
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Username: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
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
          <label htmlFor="password2">Verify Password: </label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={formData.password2}
            onChange={handleInputChange}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
    </Page>
  );
};

export default UserRegistrationForm;
