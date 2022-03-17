import Page from "../../components/Page";
import styles from "./ListingForm.module.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { editListing, getListing, reset } from "./listingSlice";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditListingForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { status, listing, message } = useSelector((state) => state.listing);
  const [formData, setFormData] = useState({
    title: "",
    price: "0",
    description: "",
    type: "Standard",
    condition: "Brand New",
  });

  if (listing && listing.title !== formData.title) {
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
      <Page title="Edit Listing">
        <form className={styles.form} onSubmit={handleListingEdit}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={formData.title}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="price">Price: (in USD)</label>
            <input
              type="number"
              name="price"
              id="price"
              min="0"
              defaultValue={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              name="description"
              id="description"
              defaultValue={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.row}>
            <div className={styles["form-group"]}>
              <label htmlFor="type">Type:</label>
              <select
                name="type"
                id="type"
                onChange={handleInputChange}
                value={formData.type}
              >
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
                value={formData.condition}
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

export default EditListingForm;
