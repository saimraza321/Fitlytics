import Login from "../../components/Auth/Login.jsx";
import GuestLayout from "../../components/Auth/GuestLayout.jsx";

const LoginPage = () => {
  return (
    <>
      <GuestLayout guestchildern={<Login />} />
    </>
  );
};

export default LoginPage;
