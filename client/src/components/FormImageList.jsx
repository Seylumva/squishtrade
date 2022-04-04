import { getListingImage } from "../utils/cloudinaryConfig";
import { FaStar } from "react-icons/fa";
import { AdvancedImage } from "@cloudinary/react";
import { toast } from "react-toastify";

const FormImageList = ({ images, setFormData, formData }) => {
  const handleDeleteImage = (imageId) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        images: prevState.images.filter((img) => img !== imageId),
      };
    });
  };

  const handleSetPrimaryImage = (imageId) => {
    const indexOfPrimaryImage = formData.images.indexOf(imageId);
    if (indexOfPrimaryImage === 0) {
      return toast.error("Image selected is the primary image.");
    }
    const newImageArray = [
      imageId,
      ...formData.images.slice(0, indexOfPrimaryImage),
      ...formData.images.slice(indexOfPrimaryImage + 1),
    ];

    setFormData((prevState) => ({ ...prevState, images: newImageArray }));
  };

  return (
    <div className="flex flex-col gap-3 my-3">
      {images.map((image, index) => (
        <div className="flex gap-3" key={index}>
          {image.constructor.name === "File" ? (
            <img
              className="w-12 aspect-square object-cover mask mask-squircle"
              key={index}
              src={URL.createObjectURL(image)}
              alt=""
            />
          ) : (
            <AdvancedImage
              cldImg={getListingImage(image)}
              className={`w-12 aspect-square object-cover mask mask-squircle`}
            />
          )}
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
            onClick={() => handleSetPrimaryImage(image)}
            disabled={index === 0}
          >
            <FaStar />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormImageList;
