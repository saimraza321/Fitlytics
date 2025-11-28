import GuestLayout from "../../components/Auth/GuestLayout.jsx";
import ForgotPassword from "../../components/Auth/ForgotPassword.jsx";

const ForgotPasswordPage = () => {
  return (
    <>
      <GuestLayout guestchildern={<ForgotPassword />} />
    </>
  );
};

export default ForgotPasswordPage;
