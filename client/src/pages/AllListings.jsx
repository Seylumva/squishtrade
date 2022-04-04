import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Spinner, ListingsList } from "../components";
import { getAllListings, reset } from "../features/listing/listingSlice";
import { Helmet } from "react-helmet-async";

const AllListings = () => {
  const { listings, status } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (status === "error") {
    return <Navigate to="/404" />;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>All listings | Squishtrade</title>
      </Helmet>
      <section className="py-12 bg-base-200 w-full min-h-screen">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-center">All Listings</h2>
        </header>
        <article>
          <ListingsList listings={listings} />
        </article>
      </section>
    </>
  );
};

export default AllListings;
