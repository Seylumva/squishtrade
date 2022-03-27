import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Francis from "../assets/Francis.png";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not found | Squishtrade</title>
      </Helmet>
      <section className="min-h-screen bg-base-200 w-full py-12">
        <header className="space-y-3">
          <h2 className="text-3xl font-semibold text-center">
            No Squishmallows here...
          </h2>
          <p className="text-lg text-center">
            This page appears to be broken or missing.{" "}
            <Link to="/" className="link link-secondary link-hover">
              Click here
            </Link>{" "}
            to get home in the meantime.
          </p>
          <img
            src={Francis}
            alt="Francis the Lion Squishmallow"
            className="w-32 mx-auto pt-5"
          />
        </header>
      </section>
    </>
  );
};

export default NotFound;
