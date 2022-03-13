import { Link } from "react-router-dom";
import Page from "../components/Page";
import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("404 Not Found");
  return (
    <Page
      title="404 Not Found"
      caption="There doesn't appear to be anything here..."
    >
      <p style={{ textAlign: "center" }}>
        You can click <Link to="/">here</Link> to go to the homepage.
      </p>
    </Page>
  );
};

export default NotFound;
