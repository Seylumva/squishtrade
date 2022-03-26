import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

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
