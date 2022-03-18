import Page from "../components/Page";
import styles from "./Home.module.css";
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
      <Page fluid={false}>
        <div className={styles.hero}>
          <img
            src={Patty}
            alt="Patty the Cow Squishmallow"
            className={styles.patty}
          />
          <h2>
            Find your ISOs and DISOs for retail prices from fellow collectors
          </h2>
          <p>
            Join a community-driven marketplace with the purpose to rehome
            Squishmallow to real collectors
          </p>
          <div className={styles.links}>
            <Link to="/about">Learn More</Link>
            <Link to="/listing/new">Start Listing</Link>
          </div>
        </div>
      </Page>
      <Page fluid={false}>
        <section className={styles.services}>
          <article className={styles.service}>
            <h3>No fees, no catch</h3>
            <p>
              We do not collect any data besides what's used to display listings
              and allow for communication between users. It is solely for the
              purpose of this website.
            </p>
          </article>
          <article className={styles.service}>
            <h3>Fair prices</h3>
            <p>
              We moderate listings to only allow them to be reasonably priced,
              guided by official retailer's prices.
            </p>
          </article>
          <img
            src={Avery}
            alt="Avery the Duck Squishmallow"
            className={styles.avery}
          />
        </section>
      </Page>
    </>
  );
};

export default Home;
