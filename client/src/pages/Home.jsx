import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Patty from "../assets/Patty.png";
import Avery from "../assets/Avery.webp";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Squishtrade</title>
      </Helmet>
      <>
        <main className="hero min-h-screen bg-base-300">
          <div className="hero-content flex-col lg:flex-row gap-16 pt-16 pb-32">
            <img
              src={Patty}
              alt="Patty the Cow Squishmallow"
              className="max-w-[150px]"
            />
            <div className="text-center lg:text-left lg:max-w-[60%]">
              <h2 className="text-primary font-bold text-2xl mb-3">
                Find your ISOs and DISOs for retail prices from fellow
                collectors
              </h2>
              <p className="text-secondary text-md font-medium mb-8">
                Join a community-driven marketplace with the purpose to rehome
                Squishmallow to real collectors
              </p>
              <div className="space-x-2">
                <a href="#about" className="btn btn-primary btn-md btn-outline">
                  Learn More
                </a>
                <Link
                  className="btn btn-secondary btn-md btn-outline"
                  to="/listing/new"
                >
                  Start Listing
                </Link>
              </div>
            </div>
          </div>
        </main>
        <div className="divider"></div>
        <section className="hero min-h-screen bg-base-500" id="about">
          <div className="hero-content flex-col lg:flex-row gap-16">
            <div className="text-center space-y-8 lg:text-left lg:max-w-[40%]">
              <article className="flex flex-col gap-3">
                <h3 className="text-primary text-xl font-bold">
                  No fees, no catch
                </h3>
                <p className="text-secondary text-md">
                  We do not collect any data besides what's used to display
                  listings and allow for communication between users. It is
                  solely for the purpose of this website.
                </p>
              </article>
              <article className="flex flex-col gap-3">
                <h3 className="text-primary text-xl font-bold">Fair prices</h3>
                <p className="text-secondary text-md ">
                  We moderate listings to only allow them to be reasonably
                  priced, guided by official retailer's prices.
                </p>
              </article>
            </div>
            <img
              className="max-w-[250px]"
              src={Avery}
              alt="Avery the Duck Squishmallow"
            />
          </div>
        </section>
      </>
    </>
  );
};

export default Home;
