const ResetPassword = () => {
  return (
    <>
      <div class="text-center mb-8">
        <img src="logo.png" class="w-32 mx-auto mb-4" alt="Fit Logo" />
        <h1 class="text-3xl font-bold text-slate-900">Reset Password?</h1>
        <p class="text-sm text-slate-500 mt-2">Reset your password here</p>
      </div>

      <div class="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <form action="login" id="loginForm">
          <div class="mb-4">
            <label class="block text-sm font-medium text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your new password "
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
            <label class="block text-sm font-medium text-slate-700 mb-2 mt-3">
              Confirm Password
            </label>
            <input
              type="password"
              id="confimr-password"
              placeholder="Enter your new password "
              class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
