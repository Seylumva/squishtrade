import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Avatar, Spinner } from "../../components";
import { getUserProfile, reset } from "./listingSlice";
import { AdvancedImage } from "@cloudinary/react";
import { getListingImage } from "../../utils/cloudinaryConfig";

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
  }, [dispatch, userId]);

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
            <div className="min-h-screen bg-base-200 w-full py-12pt-12">
              <section>
                <header className="mb-8">
                  <h2 className="text-center text-2xl font-semibold">
                    Profile
                  </h2>
                </header>
                <article className="flex justify-center max-w-sm mx-auto gap-8">
                  {/* Avatar */}
                  <div className="flex flex-col gap-3 justify-center">
                    <Avatar src={profile.avatarUrl} />
                  </div>
                  {/* profile information */}
                  <div className="flex flex-col pt-5 flex-grow">
                    <h3>
                      Name:{" "}
                      <span className="font-semibold">{profile.name}</span>
                    </h3>
                  </div>
                </article>
              </section>
              <div className="divider"></div>
              <section>
                <header className="mb-8">
                  <h2 className="text-center text-2xl font-semibold">
                    Listings
                    {listings &&
                      listings.length !== 0 &&
                      ` (${listings.length})`}
                  </h2>
                </header>
                <article>
                  {listings && listings.length ? (
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
                  ) : (
                    <>
                      <p className="text-lg text-center mb-5">
                        Doesn't seem like they have any listings.
                      </p>
                    </>
                  )}
                </article>
              </section>
            </div>
          </>
        )}
      </>
    );
  }
};

export default UserProfile;
