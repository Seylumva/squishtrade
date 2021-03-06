import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components";
import ShoppingCart from "../features/cart/ShoppingCart";
import CreateListingForm from "../features/listing/CreateListingForm";
import EditListingForm from "../features/listing/EditListingForm";
import ListingPage from "../features/listing/ListingPage";
import UserProfile from "../features/listing/UserProfile";
import UserLoginForm from "../features/user/UserLoginForm";
import UserRegistrationForm from "../features/user/UserRegistrationForm";
import AllListings from "../pages/AllListings";
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
        <Route path="/cart" element={<ShoppingCart />} />
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
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
