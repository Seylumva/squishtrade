import { Image, Transformation } from "cloudinary-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getAllListings, reset } from "../features/listing/listingSlice";
import { Helmet } from "react-helmet-async";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
            <div className="px-5 mx-auto container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <Link
                  className="p-5 bg-base-300 outline outline-base-200 hover:bg-base-100 hover:outline-base-300 transition rounded-md shadow-xl flex flex-col justify-between items-start gap-3 relative"
                  key={listing._id}
                  to={`/listing/${listing._id}`}
                >
                  <div className="space-y-2 pl-3">
                    <h4 className="text-xl font-semibold">{listing.title}</h4>
                    <p className="badge badge-outline badge-md badge-primary block">
                      <span>{`Type:  ${listing.type}`}</span>
                    </p>
                    <p className="badge badge-outline badge-md badge-secondary block">
                      <span>{`Condition:  ${listing.condition}`}</span>
                    </p>
                    <p className="text-primary text-4xl font-semibold absolute top-5 right-5">
                      ${listing.price}
                    </p>
                  </div>
                  <div className="stats stats-vertical">
                    <div to={`/profile/${listing.author._id}`} className="stat">
                      <div className="stat-figure text-secondary">
                        <div className="avatar">
                          <Image
                            cloudName="seylumva"
                            publicId={listing.author.avatarUrl}
                            className="rounded-full"
                          >
                            <Transformation
                              width="50"
                              height="50"
                              crop="fill"
                            />
                          </Image>
                        </div>
                      </div>
                      <div className="stat-value text-sm">
                        {listing.author.name}
                      </div>
                      <div className="stat-title">Trades: Soon&trade;</div>
                      <div className="stat-desc text-secondary text-sm">
                        Joined{" "}
                        {listing?.author?.createdAt &&
                          formatDistanceToNow(
                            new Date(listing.author.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                      </div>
                    </div>
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
