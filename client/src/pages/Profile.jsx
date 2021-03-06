import { Spinner, SignOutButton } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserListings, reset } from "../features/listing/listingSlice";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { changeAvatar, reset as userReset } from "../features/user/userSlice";
import { AdvancedImage } from "@cloudinary/react";
import {
  getListingImage,
  getProfileAvatar,
  uploadUserAvatar,
} from "../utils/cloudinaryConfig";

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
    if (e.target.files[0]) {
      try {
        const thunkData = await uploadUserAvatar(e.target.files[0]);
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
              <title>Your Profile | Squishtrade</title>
            </Helmet>
            <div className="min-h-screen bg-base-200 w-full py-12">
              <section>
                <header className="mb-8">
                  <h2 className="text-center text-2xl font-semibold">
                    Profile
                  </h2>
                </header>
                <article className="flex justify-center max-w-sm mx-auto gap-8">
                  {/* Avatar and upload */}
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="avatar">
                      <div className="w-24 mask mask-squircle">
                        <AdvancedImage
                          cldImg={getProfileAvatar(user.avatarUrl)}
                        ></AdvancedImage>
                      </div>
                    </div>
                    <label
                      htmlFor="avatar"
                      className="btn btn-outline btn-primary btn-sm"
                    >
                      Upload
                    </label>
                    <input
                      onChange={handleAvatarSubmit}
                      type="file"
                      className="hidden mt-auto"
                      name="avatar"
                      id="avatar"
                    />
                  </div>
                  {/* User information */}
                  <div className="flex flex-col pt-5 flex-grow">
                    <h3 className="pl-3">
                      Name: <span className="font-semibold">{user.name}</span>
                    </h3>
                    <SignOutButton
                      className="btn btn-error btn-outline btn-sm mt-auto"
                      name={user.name}
                    />
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
                    <div className="mx-auto container">
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
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-center mb-5">
                        Doesn't seem like you have any listings.
                      </p>
                      <button className="mx-auto btn btn-wide block">
                        Start listing
                      </button>
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

export default Profile;
