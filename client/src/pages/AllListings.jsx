import { Image, Transformation } from "cloudinary-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Page from "../components/Page";
import Spinner from "../components/Spinner";
import { getAllListings } from "../features/listing/listingSlice";
import styles from "./AllListings.module.css";
import { Helmet } from "react-helmet-async";

const AllListings = () => {
  const { listings, status } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  if (status === "error") {
    return (
      <Page
        title="There doesn't seem to be anything here"
        caption="Something is terribly wrong!"
      >
        In the meantime click <Link to="/">here</Link> to get back to safety!
      </Page>
    );
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>All listings | Squishtrade</title>
      </Helmet>
      <Page title="All Listings">
        <div className={styles.listings}>
          {listings &&
            listings.map((listing) => (
              <Link
                className={styles.listing}
                key={listing._id}
                to={`/listing/${listing._id}`}
              >
                <h3 className={styles.title}>{listing.title}</h3>
                <p className={styles.condition}>
                  <span>Condition:</span> {listing.condition}
                </p>
                <p className={styles.type}>
                  <span>Type:</span> {listing.type}
                </p>
                <p className={styles.price}>${listing.price}</p>
                <div className={styles.seller}>
                  <Image
                    cloudName="seylumva"
                    publicId={listing.author.avatarUrl}
                    style={{ borderRadius: "50%" }}
                  >
                    <Transformation width="35" height="35" crop="fill" />
                  </Image>
                  <div>
                    <h3>Listed by {listing.author.name}</h3>
                    <p>Trades: #</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Page>
    </>
  );
};

export default AllListings;
