import { AdvancedImage } from "@cloudinary/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import { getListingAvatar } from "../utils/cloudinaryConfig";

const UserStats = ({ author }) => {
  return (
    <div className="stats bg-base-300 stats-vertical shadow border-2 border-transparent transition hover:border-slate-600">
      <Link to={`/profile/${author._id}`} className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar rounded-badge overflow-hidden">
            <AdvancedImage
              cldImg={getListingAvatar(author.avatarUrl)}
            ></AdvancedImage>
          </div>
        </div>
        <div className="stat-value text-lg">{author.name}</div>
        <div className="stat-title">Trades: Soon&trade;</div>
        <div className="stat-desc text-secondary text-sm">
          Joined{" "}
          {formatDistanceToNow(new Date(author.createdAt), {
            addSuffix: true,
          })}
        </div>
      </Link>
    </div>
  );
};

export default UserStats;
