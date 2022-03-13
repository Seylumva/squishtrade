import Page from "../components/Page";
import useDocumentTitle from "../hooks/useDocumentTitle";
import styles from "./Home.module.css";

const Home = () => {
  useDocumentTitle("Home");
  return (
    <Page fluid={false}>
      <div className={styles.hero}>
        <h2>Welcome to my MERN application starting template.</h2>
        <p>
          To read on how to use it, please read through the{" "}
          <a
            href="https://github.com/Seylumva/mern-app-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentation.
          </a>
        </p>
      </div>
      <div className={styles.attribution}>
        Made by{" "}
        <a
          href="https://github.com/Seylumva"
          target="_blank"
          rel="noopener noreferrer"
        >
          Emilio Noa
        </a>{" "}
        ⚡
      </div>
    </Page>
  );
};

export default Home;
