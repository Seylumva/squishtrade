import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListingImage,
  editListing,
  getListing,
  reset,
} from "./listingSlice";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import { getListingImage } from "../../utils/cloudinaryConfig";
import { FaStar } from "react-icons/fa";

const EditListingForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { status, listing, message } = useSelector((state) => state.listing);
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    price: "0",
    description: "",
    type: "",
    condition: "",
    images: [],
  });

  if (listing && listing._id !== formData._id) {
    setFormData({ ...listing });
  }

  useEffect(() => {
    dispatch(getListing(postId));
    if (listing && status === "success") {
      setFormData({
        title: listing.title,
        price: listing.price,
        description: listing.description,
        condition: listing.condition,
        images: listing.images,
      });
    }

    if (status === "error") {
      toast.error(message);
    }
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line
  }, [dispatch, navigate]);

  const handleListingEdit = (e) => {
    e.preventDefault();
    const formattedListing = {
      ...formData,
      price: Number(formData.price),
    };
    dispatch(
      editListing({
        listingId: postId,
        formData: formattedListing,
      })
    )
      .unwrap()
      .then((res) => {
        if (status === "success") {
          navigate(`/listing/${postId}`);
          toast.success("Successfully edited listing.");
        }
      })
      .catch((err) => {
        toast.error(err);
        navigate(`/listing/${postId}`);
      });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeleteImage = (imageId) => {
    dispatch(deleteListingImage({ postId, imageId }))
      .unwrap()
      .then((data) => {
        setFormData((state) => ({ ...state, images: data.images }));
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleSetPrimaryImage = () => {
    toast.info("Feature coming soon.");
  };

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "success" && listing.author._id !== user.id) {
    return <Navigate to={`/listing/${postId}`} />;
  }

  return (
    <>
      <Helmet>
        <title>Edit Listing | Squishtrade</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 w-full py-12">
        <h2 className="text-center text-3xl font-medium mb-8">Edit Listing</h2>
        <form
          className="max-w-sm flex flex-col items-center mx-auto gap-1"
          onSubmit={handleListingEdit}
        >
          {/* Title */}
          <div className="form-control w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered"
              name="title"
              id="title"
              onChange={handleInputChange}
              value={formData.title}
              maxLength={40}
              required
            />
          </div>
          {/* Images */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Images</span>
            </label>
            <div className="flex flex-col gap-3">
              {formData.images.map((image, index) => (
                <div className="flex gap-3" key={index}>
                  <AdvancedImage
                    cldImg={getListingImage(image)}
                    className={`w-12 aspect-square object-cover mask mask-squircle`}
                  />
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteImage(image)}
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={handleSetPrimaryImage}
                  >
                    <FaStar />
                  </button>
                </div>
              ))}
            </div>
            <div className="">
              <label
                htmlFor="avatar"
                className="btn btn-outline btn-primary btn-sm w-full mt-3"
              >
                Upload
              </label>
              <input
                type="file"
                className="hidden mt-auto"
                name="avatar"
                id="avatar"
                multiple
              />
            </div>
          </div>
          {/* Squish Price */}
          <div className="form-control w-full">
            <label htmlFor="price" className="label">
              <span className="label-text">Price</span>
            </label>
            <label className="input-group">
              <span>$</span>
              <input
                type="number"
                placeholder="Price (USD)"
                className="input input-bordered flex-grow"
                name="price"
                id="price"
                onChange={handleInputChange}
                value={formData.price}
                min={0}
                required
              />
              <span>USD</span>
            </label>
          </div>
          {/* Squish Description */}
          <div className="form-control w-full">
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-y w-full"
              style={{ minHeight: "250px" }}
              placeholder="Description"
              name="description"
              id="description"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
          </div>
          <div className="flex w-full justify-between items-center gap-5">
            {/* Squish Type */}
            <div className="form-control flex-grow">
              <label className="label" htmlFor="type">
                <span className="label-text">Squishmallow type</span>
              </label>
              <select
                className="select select-bordered"
                name="type"
                id="type"
                onChange={handleInputChange}
                value={formData.type}
              >
                <option value="Standard">Standard</option>
                <option value="Stack">Stack</option>
                <option value="Squeezemallow">Squeezemallow</option>
                <option value="Tin">Tin</option>
                <option value="Hug Mee">Hug Mee</option>
              </select>
              <label className="label"></label>
            </div>
            {/* Squish Condition */}
            <div className="form-control flex-grow">
              <label htmlFor="condition" className="label">
                <span className="label-text">Squishmallow type</span>
              </label>
              <select
                className="select select-bordered"
                name="condition"
                id="condition"
                onChange={handleInputChange}
                value={formData.condition}
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
              </select>
              <label className="label"></label>
            </div>
          </div>
          <button className="btn btn-block btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default EditListingForm;
