import { ListingsCard } from "../components";

const ListingsList = ({ listings }) => {
  return (
    <div className="px-5 mx-auto container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-5">
      {listings &&
        listings.length > 0 &&
        listings.map((listing) => (
          <ListingsCard key={listing._id} listing={listing} />
        ))}
    </div>
  );
};

export default ListingsList;
