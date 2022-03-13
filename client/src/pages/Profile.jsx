import { useSelector } from "react-redux";
import Page from "../components/Page";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Page fluid={false} title="Profile">
      <div className="profile">
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
      </div>
    </Page>
  );
};

export default Profile;
