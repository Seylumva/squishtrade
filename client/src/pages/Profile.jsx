import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserListings, reset } from "../features/listing/listingSlice";
import styles from "./Profile.module.css";
import Spinner from "../components/Spinner";
import Page from "../components/Page";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";
import { Image, Transformation } from "cloudinary-react";
import { changeAvatar, reset as userReset } from "../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { listings, status, message } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(getUserListings());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (e.target.elements[0].files[0]) {
      try {
        const formData = new FormData();
        formData.append("file", e.target.elements[0].files[0]);
        formData.append("upload_preset", "squishtrade_assets");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/seylumva/image/upload",
          {
            method: "POST",
            body: formData,
          }
        ).then((res) => res.json());
        const thunkData = {
          avatarUrl: res.public_id,
        };
        dispatch(changeAvatar(thunkData)).then(() => dispatch(userReset()));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (status === "loading") {
    return <Spinner />;
  } else if (status === "error") {
    toast.error(message);
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        {user && (
          <>
            <Helmet>
              <title>Profile | Squishtrade</title>
            </Helmet>
            <Page fluid={false} title="Profile">
              <div className={styles.profile}>
                <Image cloudName="seylumva" publicId={user.avatarUrl}>
                  <Transformation width="125" height="125" crop="fill" />
                </Image>
                <form onSubmit={handleAvatarSubmit}>
                  <input type="file" /> <button>Submit</button>
                </form>
                <div className={styles["form-group"]}>
                  <label htmlFor="name">Username: </label>
                  <input type="text" value={user.name} id="name" disabled />
                </div>
                <div className={styles["form-group"]}>
                  <label htmlFor="name">Email: </label>
                  <input type="text" value={user.email} id="email" disabled />
                </div>
                <SignOutButton name={user.name} />
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

export default Profile;
