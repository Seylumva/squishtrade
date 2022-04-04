import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteListing } from "../features/listing/listingSlice";

const DeleteListingButton = ({ listingId, text, outline }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      dispatch(deleteListing(listingId))
        .unwrap()
        .then(() => {
          navigate("/profile");
          toast.success(`Listing deleted.`);
        })
        .catch((err) => toast.error(err));
    }
  };

  return (
    <button
      className={`btn btn-error btn-md ${outline ? "btn-outline" : ""}`}
      onClick={handleDelete}
    >
      {text}
    </button>
  );
};

DeleteListingButton.defaultProps = {
  text: "Delete",
  outline: true,
};

export default DeleteListingButton;
