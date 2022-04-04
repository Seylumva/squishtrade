import { Cloudinary } from "@cloudinary/url-gen";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { toast } from "react-toastify";

const cld = new Cloudinary({
  cloud: {
    cloudName: "seylumva",
  },
});

export const getListingAvatar = (publicId) => {
  const avatar = cld.image(publicId);
  avatar.resize(fill().width(50).height(50));
  return avatar;
};

export const getProfileAvatar = (publicId) => {
  const avatar = cld.image(publicId);
  avatar.resize(fill().width(100).height(100));
  return avatar;
};

export const getListingImage = (publicId) => {
  const image = cld.image(publicId);
  image.resize(scale().height(400));
  return image;
};

export const uploadUserAvatar = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "squishtrade_assets");
  const res = await fetch("https://api.cloudinary.com/v1_1/seylumva/upload", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
  const thunkData = {
    avatarUrl: res.public_id,
  };
  return thunkData;
};

export const uploadListingPictures = async (images) => {
  try {
    const formData = new FormData();
    const listingImages = [];
    for (let image of images) {
      formData.append("file", image);
      formData.append("upload_preset", "squishtrade_assets");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/seylumva/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error("Wrong file type.");
      }
      listingImages.push(data.public_id);
    }
    return listingImages;
  } catch (error) {
    toast.error(error.message);
  }
};
