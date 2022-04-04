import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import { getListingImage } from "../utils/cloudinaryConfig";

const ListingsCard = ({ listing }) => {
  return (
    <Link
      className="p-5 bg-base-300 outline outline-base-200 hover:bg-base-100 justify-between hover:outline-base-300 transition rounded-md shadow-xl flex flex-col items-start gap-8 relative"
      key={listing._id}
      to={`/listing/${listing._id}`}
    >
      {listing.images.length > 0 && (
        <div className="w-full">
          <AdvancedImage
            className="object-cover object-center w-full"
            cldImg={getListingImage(listing.images[0])}
          />
        </div>
      )}
      <div className="space-y-3 max-w-full">
        <h4 className="text-xl font-semibold text-ellipsis whitespace-nowrap max-w-full overflow-hidden">
          {listing.title}
        </h4>
        <p className="text-primary text-4xl font-semibold">${listing.price}</p>
        <p className="badge badge-outline badge-md badge-primary block">
          <span>{`Type:  ${listing.type}`}</span>
        </p>
        <p className="badge badge-outline badge-md badge-secondary block">
          <span>{`Condition:  ${listing.condition}`}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListingsCard;
