import { Link } from "react-router-dom";
import Page from "../components/Page";
import { Helmet } from "react-helmet-async";
import Francis from "../assets/Francis.png";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not found | Squishtrade</title>
      </Helmet>
      <Page
        title="404 Not Found"
        caption="Doesn't look like Francis is at this Walgreens... I mean page!"
      >
        <article className={styles.notfound}>
          <img
            src={Francis}
            className={styles.francis}
            alt="Francis the Lion Squishmallow"
          />
          <p style={{ textAlign: "center" }}>
            You can click <Link to="/">here</Link> to go to the homepage.
          </p>
        </article>
      </Page>
    </>
  );
};

export default NotFound;
