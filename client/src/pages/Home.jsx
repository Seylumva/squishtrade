import Page from "../components/Page";
import styles from "./Home.module.css";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Squishtrade</title>
      </Helmet>
      <Page fluid={false}>
        <div className={styles.hero}>
          <h2>Welcome to Squishtrade!</h2>
          <p>
            Home of retail priced Squishmallow sold and traded by fellow
            collectors.
          </p>
        </div>
      </Page>
    </>
  );
};

export default Home;
