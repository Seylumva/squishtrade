import Page from "../../components/Page";
import styles from "./ListingForm.module.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { createListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  });

  useEffect(() => {
    if (status === "error") {
      toast.error(message);
    }
    if (listing && status === "success") {
      navigate(`/listing/${listing?._id}`, { replace: true });
    }
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line
  }, [message, dispatch, navigate, listing]);

  const handleListingSubmit = (e) => {
    e.preventDefault();
    const listing = {
      ...formData,
      price: Number(formData.price),
    };
    dispatch(createListing(listing));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      <Page title="New Listing" caption="Find your squish a new home today!">
        <form className={styles.form} onSubmit={handleListingSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="price">Price: (in USD)</label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.row}>
            <div className={styles["form-group"]}>
              <label htmlFor="type">Type:</label>
              <select name="type" id="type" onChange={handleInputChange}>
                <option value="Standard">Standard</option>
                <option value="Stack">Stack</option>
                <option value="Squeezemallow">Squeezemallow</option>
                <option value="Tin">Tin</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="condition">Condition:</label>
              <select
                name="condition"
                id="condition"
                onChange={handleInputChange}
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
              </select>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <button>Submit</button>
          </div>
        </form>
      </Page>
    </>
  );
};

export default CreateListingForm;
