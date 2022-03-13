import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { user } = useSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsChecking(false);
  }, [user]);

  return [isChecking, isLoggedIn];
};

export default useAuth;
