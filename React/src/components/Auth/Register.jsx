const Register = () => {
  return (
    <>
          <div className="text-center mb-8">
            <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
            <h1 className="text-3xl font-bold text-slate-900">
              Create Account
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Start your fitness journey today
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <form id="registerForm">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  required
                />
              </div>

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

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-lime-400 border-slate-300 rounded focus:ring-lime-400"
                    required
                  />
                  <span className="text-xs text-slate-600">
                    I agree to the
                    <a href="#" className="text-lime-600 hover:underline">
                      Terms & Conditions
                    </a>
                    and
                    <a href="#" className="text-lime-600 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
              >
                Create Account
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-slate-400">OR</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition duration-300"
              >
                <i className="fa-brands fa-google text-red-500"></i>
                <span className="text-sm font-medium text-slate-700">
                  Continue with Google
                </span>
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-slate-600">
                Already have an account?
                <a
                  href="login"
                  className="text-lime-600 font-semibold hover:underline"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
    </>
  );
};

export default Register;
