import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { FormImageInput, FormImageList, Spinner } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { createListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadListingImages } from "../../utils/cloudinaryConfig";

const CreateListingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, listing, message } = useSelector((state) => state.listing);
  const [formData, setFormData] = useState({
    title: "",
    price: "0",
    description: "",
    type: "Standard",
    condition: "Brand New",
    images: [],
  });

  useEffect(() => {
    if (status === "error") {
      toast.error(message);
    }
    if (listing && status === "success") {
      navigate(`/listing/${listing?.id}`, { replace: true });
    }
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line
  }, [message, dispatch, navigate, listing]);

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.description) {
      toast.error("Please provide all the necessary fields.");
    } else {
      let listingImages = [];
      if (formData.images.length > 0) {
        listingImages = await uploadListingImages(formData.images);
      }
      if (!listingImages) {
        return;
      }
      const listing = {
        ...formData,
        images: listingImages,
        price: Number(formData.price),
      };
      dispatch(createListing(listing));
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddImage = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...e.target.files],
    }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>New Listing | Squishtrade</title>
      </Helmet>
      <div className="min-h-screen bg-base-200 w-full py-12">
        <h2 className="text-center text-3xl font-medium mb-8">New Listing</h2>
        <form
          className="max-w-sm flex flex-col items-center mx-auto gap-1"
          onSubmit={handleListingSubmit}
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
              <span className="label-text">
                Images{" "}
                {formData.images.length > 0 && `(${formData.images.length})`}
              </span>
            </label>
            <FormImageList
              images={formData.images}
              setFormData={setFormData}
              formData={formData}
            />
            <FormImageInput handleAddImage={handleAddImage} />
          </div>
          {/* Price */}
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

export default CreateListingForm;
