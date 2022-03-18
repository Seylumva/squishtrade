import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import Page from "../../components/Page";
import Spinner from "../../components/Spinner";
import { getUserProfile, reset } from "./listingSlice";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { profile, listings, status } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile(userId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <Spinner />;
  } else if (status === "error") {
    return <Navigate to="/404" replace={true} />;
  } else {
    return (
      <>
        {profile && user && profile._id === user.id && (
          <Navigate to="/profile" replace={true} />
        )}
        {profile && (
          <>
            <Helmet>
              <title>{profile.name}'s Profile | Squishtrade</title>
            </Helmet>
            <Page fluid={false} title={`${profile.name}'s Profile`}>
              <div className={styles.profile}>
                <div className={styles["form-group"]}>
                  <label htmlFor="name">Contact email: </label>
                  <input
                    type="text"
                    value={profile.email}
                    id="email"
                    disabled
                  />
                </div>
              </div>
              <Page title={`Listings by ${profile.name}`} fluid={true}>
                {listings && !listings.length && (
                  <p className={styles.empty}>
                    It appears this user doesn't have any listings.
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
                        <h3 className={styles.title}>{listing.title}</h3>
                        <p className={styles.condition}>
                          <span>Condition:</span> {listing.condition}
                        </p>

                        <p className={styles.type}>
                          <span>Type:</span> {listing.type}
                        </p>

                        <p className={styles.price}>${listing.price}</p>
                      </Link>
                    ))}
                </article>
              </Page>
            </Page>
          </>
        )}
      </>
    );
  }
};

export default UserProfile;
