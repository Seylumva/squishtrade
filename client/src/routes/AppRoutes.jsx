import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import CreateListingForm from "../features/listing/CreateListingForm";
import EditListingForm from "../features/listing/EditListingForm";
import ListingPage from "../features/listing/ListingPage";
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
        <Route path="/listing/:postId" element={<ListingPage />} />
        <Route path="/listing/:postId/edit" element={<PrivateRoute />}>
          <Route index element={<EditListingForm />} />
        </Route>
        <Route path="/listing/new" element={<PrivateRoute />}>
          <Route index element={<CreateListingForm />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
