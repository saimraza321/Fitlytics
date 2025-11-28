const ForgotPassword = () => {
  return (
    <>
      <div className="text-center mb-8">
        <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
        <h1 className="text-3xl font-bold text-slate-900">Forgot Password?</h1>
        <p className="text-sm text-slate-500 mt-2">
          Forgot Your password? No worries
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <form action="reset-password.html" id="loginForm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            Send Password Reset Link
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
