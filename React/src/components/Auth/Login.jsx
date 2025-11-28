const Login = () => {
  return (
    <>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="logo.png" className="w-32 mx-auto mb-4" alt="Fit Logo" />
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-2">
            Login to continue your fitness journey
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
          <form id="loginForm">
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
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-lime-400 border-slate-300 rounded focus:ring-lime-400"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="forgot-password.html"
                className="text-sm text-lime-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DAF17D] hover:bg-[#c5d96e] text-slate-900 font-semibold py-3 rounded-xl transition duration-300"
            >
              Login
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
              Don't have an account?
              <a
                href="register.html"
                className="text-lime-600 font-semibold hover:underline"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login