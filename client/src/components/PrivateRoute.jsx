import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Page from "./Page";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const [isChecking, isLoggedIn] = useAuth();
  if (isChecking) {
    return <Spinner />;
  }
  return (
    <>{isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />}</>
  );
};

export default PrivateRoute;
