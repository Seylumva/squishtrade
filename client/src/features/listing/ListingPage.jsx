import { Navigate, useNavigate, useParams } from "react-router-dom";
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
  const { listing, status, message } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getListing(postId));
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

  if (status === "error") {
    return <Navigate to="/" replace={true} />;
  }
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
                <button>Edit</button>
                <button
                  onClick={() => {
                    dispatch(reset());
                    dispatch(deleteListing(listing._id));
                    if (status === "success") {
                      toast.success(`Successfully deleted listing.`);
                      navigate("/profile", { replace: true });
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
};

export default ListingPage;
