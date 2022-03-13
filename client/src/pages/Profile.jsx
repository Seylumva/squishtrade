import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserListings, reset } from "../features/listing/listingSlice";
import styles from "./Profile.module.css";
import Spinner from "../components/Spinner";
import Page from "../components/Page";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { listings, status, message } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserListings());
    if (status === "error") {
      toast.error(message);
    }
    if (status === "success") {
      dispatch(reset());
    }
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line
  }, [dispatch, message]);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Profile | Squishtrade</title>
      </Helmet>
      <Page fluid={false} title="Profile">
        <div className={styles.profile}>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Username: </label>
            <input type="text" value={user.name} id="name" disabled />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="name">Email: </label>
            <input type="text" value={user.email} id="email" disabled />
          </div>
        </div>
        <Page title="Listings" fluid={true}>
          {listings && !listings.length && (
            <p className={styles.empty}>
              It appears you don't have any listings, get started{" "}
              <Link to="/listing/new">here!</Link>
            </p>
          )}
          <article className={styles.listings}>
            {listings &&
              listings.map((listing) => (
                <Link
                  to={`/listing/${listing._id}`}
                  className={styles.listing}
                  key={listing._id}
                >
                  <h3>{listing.title}</h3>
                  <p>{listing.description}</p>
                  <p>Price: ${listing.price}</p>
                </Link>
              ))}
          </article>
        </Page>
      </Page>
    </>
  );
};

export default Profile;
