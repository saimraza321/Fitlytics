import Sidebar from "../components/sidebar";

const Layout = ({ childern }) => {
  return (
    <>
      <div>
        
        <div className="min-h-screen flex">
          <Sidebar />
          {childern}
        </div>
        
      </div>
    </>
  );
};

export default Layout;
