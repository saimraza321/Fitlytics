import EditProfile from "../components/EditProfile";
import Layout from "../components/Layout";

const ProfilePage = () => {
  return (
    <>
      <Layout childern={<EditProfile />} />
    </>
  );
};

export default ProfilePage;
