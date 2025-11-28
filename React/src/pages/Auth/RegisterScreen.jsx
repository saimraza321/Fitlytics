import GuestLayout from "../../components/Auth/GuestLayout.jsx";
import Register from "../../components/Auth/Register.jsx";

const RegisterPage = () => {
  return (
    <>
      <GuestLayout guestchildern={<Register />} />
    </>
  );
};

export default RegisterPage;
