import GuestLayout from "../../components/Auth/GuestLayout.jsx";
import ResetPassword from "../../components/Auth/ResetPassword.jsx";

const ResetPasswordPage = () => {
  return (
    <>
      <GuestLayout guestchildern={<ResetPassword />} />
    </>
  );
};

export default ResetPasswordPage;
