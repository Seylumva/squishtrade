import { AdvancedImage } from "@cloudinary/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { getListingAvatar } from "../utils/cloudinaryConfig";

const AuthorStats = ({ author }) => {
  return (
    <div className="stats stats-vertical">
      <div to={`/profile/${author._id}`} className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar rounded-badge overflow-hidden">
            <AdvancedImage
              cldImg={getListingAvatar(author.avatarUrl)}
            ></AdvancedImage>
          </div>
        </div>
        <div className="stat-value text-sm">{author.name}</div>
        <div className="stat-title">Trades: Soon&trade;</div>
        <div className="stat-desc text-secondary text-sm">
          Joined{" "}
          {author.createdAt &&
            formatDistanceToNow(new Date(author.createdAt), {
              addSuffix: true,
            })}
        </div>
      </div>
    </div>
  );
};

export default AuthorStats;
