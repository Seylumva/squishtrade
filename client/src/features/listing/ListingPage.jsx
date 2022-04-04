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

const ListingPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
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
            <article className="min-h-screen bg-base-200 w-full py-12 relative">
              <div className="container mx-auto space-y-5 px-5">
                {listing.images.length > 0 && (
                  <>
                    <div className="carousel max-w-full h-[400px]">
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
                    <div className="flex justify-center w-full py-2 gap-2">
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
                <div className="space-y-3">
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
                    <div className="flex gap-3">
                      <Link
                        to="edit"
                        className="btn btn-primary btn-outline btn-md"
                      >
                        Edit
                      </Link>
                      <DeleteListingButton listingId={listing._id} />
                    </div>
                  )}
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
