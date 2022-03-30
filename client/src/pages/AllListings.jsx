import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Spinner, AuthorStats } from "../components";
import { getAllListings, reset } from "../features/listing/listingSlice";
import { Helmet } from "react-helmet-async";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AdvancedImage } from "@cloudinary/react";
import { getListingAvatar, getListingImage } from "../utils/cloudinaryConfig";

const AllListings = () => {
  const { listings, status } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (status === "error") {
    return <Navigate to="/404" />;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>All listings | Squishtrade</title>
      </Helmet>
      <section className="py-12 bg-base-200 w-full min-h-screen">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-center">All Listings</h2>
        </header>
        <article>
          {listings && (
            <div className="px-5 mx-auto container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-5">
              {listings.map((listing) => (
                <Link
                  className="p-5 bg-base-300 outline outline-base-200 hover:bg-base-100 justify-between hover:outline-base-300 transition rounded-md shadow-xl flex flex-col items-start gap-8 relative"
                  key={listing._id}
                  to={`/listing/${listing._id}`}
                >
                  {listing.images.length > 0 && (
                    <div className="w-full">
                      <AdvancedImage
                        className="object-cover object-center w-full"
                        cldImg={getListingImage(listing.images[0])}
                      />
                    </div>
                  )}
                  <div className="space-y-3 max-w-full">
                    <h4 className="text-xl font-semibold text-ellipsis whitespace-nowrap max-w-full overflow-hidden">
                      {listing.title}
                    </h4>
                    <p className="text-primary text-4xl font-semibold">
                      ${listing.price}
                    </p>
                    <p className="badge badge-outline badge-md badge-primary block">
                      <span>{`Type:  ${listing.type}`}</span>
                    </p>
                    <p className="badge badge-outline badge-md badge-secondary block">
                      <span>{`Condition:  ${listing.condition}`}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </article>
      </section>
    </>
  );
};

export default AllListings;
