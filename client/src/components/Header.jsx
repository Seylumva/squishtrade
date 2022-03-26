import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshUserData, reset } from "../features/user/userSlice";
import { AdvancedImage } from "@cloudinary/react";
import SignOutButton from "./SignOutButton";
import { getProfileAvatar } from "../utils/cloudinaryConfig";
const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Runs once when the page is first opened or refreshed to
  // update the user state from the server across other devices
  useEffect(() => {
    if (user) {
      dispatch(refreshUserData()).then(() => dispatch(reset()));
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <div className="bg-base-100 shadow-xl rounded-box">
        <div className="navbar container mx-auto">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Squishtrade
            </Link>
          </div>
          <Link to="/listings" className="btn btn-ghost btn-sm mr-3">
            Browse
          </Link>
          {user ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <AdvancedImage
                      cldImg={getProfileAvatar(user.avatarUrl)}
                    ></AdvancedImage>
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/listing/new">New Listing</Link>
                  </li>
                  <li>
                    <SignOutButton />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-none space-x-3">
              <Link
                to="/register"
                className="btn btn-sm btn-outline btn-secondary"
              >
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-sm btn-primary">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
