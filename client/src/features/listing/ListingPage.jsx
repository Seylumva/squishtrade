import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import Page from "../../components/Page";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";
import styles from "./ListingPage.module.css";

const ListingPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listing, status } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getListing(postId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);

  if (status === "loading") {
    return <Spinner />;
  } else if (status === "error") {
    return <Navigate to="/404" replace={true} />;
  } else {
    return (
      <>
        {listing && (
          <>
            <Helmet>
              <title>{listing.title} | Squishtrade</title>
            </Helmet>
            <Page>
              <article className={styles.listing}>
                <h2 className={styles.title}>{listing.title}</h2>
                <h3 className={styles.price}>Price: ${listing.price}</h3>
                <p className={styles.condition}>
                  Condition: {listing.condition}
                </p>
                <p className={styles.type}>Type: {listing.type}</p>
                <p className={styles.description}>{listing.description}</p>
                {user && user.id === listing.author._id ? (
                  <div className={styles.links}>
                    <Link to="edit" className={styles.link}>
                      Edit
                    </Link>
                    <button
                      className={styles.link}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this listing?"
                          )
                        ) {
                          dispatch(deleteListing(listing._id))
                            .unwrap()
                            .then((res) => {
                              navigate("/profile");
                              toast.success(`Listing deleted.`);
                            })
                            .catch((err) => toast.error(err));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button className={styles.link}>Contact Seller</button>
                )}

                <Link
                  to={`/profile/${listing.author._id}`}
                  className={styles.seller}
                >
                  <div className={styles["fake-avatar"]}></div>
                  <div>
                    <h3>Listed by: {listing.author.name}</h3>
                    <p>Trades: 5</p>
                  </div>
                </Link>
              </article>
            </Page>
          </>
        )}
      </>
    );
  }
};

export default ListingPage;
