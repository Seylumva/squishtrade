import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListing, getListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";
import { AdvancedImage } from "@cloudinary/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {
  getListingAvatar,
  getListingImage,
} from "../../utils/cloudinaryConfig";

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
            <article className="min-h-screen bg-base-200 w-full py-12 relative">
              <div className="container mx-auto space-y-5 px-5">
                {listing.images.length > 0 && (
                  <>
                    <div className="carousel max-w-full">
                      {listing.images.map((image, index) => (
                        <div
                          id={`item${index + 1}`}
                          className="carousel-item w-full"
                          key={index}
                        >
                          <AdvancedImage
                            className="mx-auto object-contain rounded-lg"
                            cldImg={getListingImage(image)}
                          ></AdvancedImage>
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
                <p>{listing.description}</p>
                <div className="space-y-3">
                  <p className="text-gray-400 font-semibold">
                    Posted{" "}
                    {formatDistanceToNow(new Date(listing.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                  {listing.createdAt !== listing.updatedAt && (
                    <p className="text-gray-400 font-semibold">
                      Updated{" "}
                      {formatDistanceToNow(new Date(listing.updatedAt), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                  {user && user.id === listing.author._id && (
                    <div className="flex gap-3">
                      <Link
                        to="edit"
                        className="btn btn-primary btn-outline btn-md"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-error btn-outline btn-md"
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
                  )}

                  <div className="stats bg-base-300 stats-vertical shadow border-2 border-transparent transition hover:border-slate-600">
                    <Link
                      to={`/profile/${listing.author._id}`}
                      className="stat"
                    >
                      <div className="stat-figure text-secondary">
                        <div className="avatar rounded-badge overflow-hidden">
                          <AdvancedImage
                            cldImg={getListingAvatar(listing.author.avatarUrl)}
                          ></AdvancedImage>
                        </div>
                      </div>
                      <div className="stat-value text-lg">
                        {listing.author.name}
                      </div>
                      <div className="stat-title">Trades: Soon&trade;</div>
                      <div className="stat-desc text-secondary text-sm">
                        Joined{" "}
                        {formatDistanceToNow(
                          new Date(listing.author.createdAt),
                          {
                            addSuffix: true,
                          }
                        )}
                      </div>
                    </Link>
                  </div>
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
