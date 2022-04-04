import { AdvancedImage } from "@cloudinary/react";
import { getProfileAvatar } from "../utils/cloudinaryConfig";

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <div className="w-24 mask mask-squircle">
        <AdvancedImage cldImg={getProfileAvatar(src)}></AdvancedImage>
      </div>
    </div>
  );
};

export default Avatar;
