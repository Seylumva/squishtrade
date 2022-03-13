import PropTypes from "prop-types";
import styles from "./Page.module.css";

const Page = ({ title, caption, fluid, children }) => {
  // Section will only appear if a title is provided.
  // Fluid = true: Page will be 100% of the display.
  // Fluid = false: Page will be 90% of the full page in mobile and
  // 960px on larger displays.
  const pageType = fluid ? styles["page-fluid"] : styles.page;

  return (
    <section className={pageType}>
      {title && (
        <header className={styles.heading}>
          <h2>{title}</h2>
          <p>{caption}</p>
        </header>
      )}
      {children}
    </section>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  caption: PropTypes.string,
  fluid: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Page.defaultProps = {
  fluid: false,
};

export default Page;
