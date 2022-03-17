import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import Page from "../../components/Page";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";

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
              <h2>{listing.title}</h2>
              <h3>Price: ${listing.price}</h3>
              <p>Condition: {listing.condition}</p>
              <p>Type: {listing.type}</p>
              <p>{listing.description}</p>
              {user && user.id === listing.author._id ? (
                <>
                  <Link to="edit">Edit</Link>
                  <button
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
                </>
              ) : (
                <button>Contact Seller</button>
              )}

              <div className="seller">
                <h3>Sold by: {listing.author.name}</h3>
                <p>Contact email: {listing.author.email}</p>
              </div>
            </Page>
          </>
        )}
      </>
    );
  }
};

export default ListingPage;
