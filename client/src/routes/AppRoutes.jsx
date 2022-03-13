import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import UserLoginForm from "../features/user/UserLoginForm";
import UserRegistrationForm from "../features/user/UserRegistrationForm";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegistrationForm />} />
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
