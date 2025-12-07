import Home from "../components/Home";
import Layout from "../components/Layout";

const Homepage = () => {
  return (
    <>
      <Layout childern={<Home />} />
    </>
  );
};

export default Homepage;
