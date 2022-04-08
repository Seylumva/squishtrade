import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListing, reset } from "./listingSlice";
import {
  FormattedTimestamp,
  Spinner,
  DeleteListingButton,
  UserStats,
} from "../../components";
import { Helmet } from "react-helmet-async";
import { AdvancedImage } from "@cloudinary/react";
import { getListingImage } from "../../utils/cloudinaryConfig";
import { FaCartPlus } from "react-icons/fa";
import { addItem } from "../cart/cartSlice";
import { toast } from "react-toastify";

const ListingPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { listing, status } = useSelector((state) => state.listing);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getListing(postId));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, postId]);

  const handleAddItem = () => {
    const hasItem = cart.find((item) => item.id === listing.id);
    if (hasItem) {
      toast.error("Item is already in your cart.");
      return;
    }
    toast.success("Item added to cart.");
    dispatch(addItem(listing));
  };

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
            <article className="container mx-auto min-h-screen w-full py-12 relative flex flex-col items-center lg:flex-row lg:justify-center lg:items-start gap-8 lg:gap-0">
              {/* Carousel */}
              <div className="space-y-5 px-5 max-w-md">
                {listing.images.length > 0 && (
                  <>
                    <div className="carousel">
                      {listing.images.map((image, index) => (
                        <div
                          id={`item${index + 1}`}
                          className="carousel-item w-full"
                          key={index}
                        >
                          <AdvancedImage
                            className="mx-auto object-contain rounded-lg"
                            cldImg={getListingImage(image)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center py-2 gap-2">
                      {listing.images.map((images, index) => (
                        <a
                          className="btn btn-xs"
                          href={`#item${index + 1}`}
                          key={index}
                        >
                          {index + 1}
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* Info */}
              <div className="space-y-3 px-5">
                <h2 className="text-4xl font-semibold">{listing.title}</h2>
                <h3 className="text-2xl font-semibold text-primary">
                  Price: ${listing.price} USD
                </h3>
                <div className="flex gap-2">
                  <p className="badge badge-outline badge-lg badge-primary">
                    <span>{`Type:  ${listing.type}`}</span>
                  </p>
                  <p className="badge badge-outline badge-lg badge-secondary">
                    <span>{`Condition:  ${listing.condition}`}</span>
                  </p>
                </div>
                <p className="whitespace-pre-wrap">{listing.description}</p>
                <div className="flex flex-col gap-3 items-start">
                  <FormattedTimestamp
                    timestamp={listing.createdAt}
                    prepend="Created"
                  />
                  {listing.createdAt !== listing.updatedAt && (
                    <FormattedTimestamp
                      timestamp={listing.updatedAt}
                      prepend="Updated"
                    />
                  )}
                  {user && user.id === listing.author._id && (
                    <div className="flex gap-3 py-2">
                      <Link
                        to="edit"
                        className="btn btn-primary btn-outline btn-md"
                      >
                        Edit
                      </Link>
                      <DeleteListingButton listingId={listing.id} />
                    </div>
                  )}
                  <button
                    disabled={
                      cart.findIndex((item) => item.id === listing.id) !== -1
                    }
                    className="btn btn-primary gap-2"
                    onClick={handleAddItem}
                    type="button"
                  >
                    <FaCartPlus /> Add to cart
                  </button>
                  <UserStats author={listing.author} />
                </div>
              </div>
            </article>
          </>
        )}
      </>
    );
  }
};

export default ListingPage;
