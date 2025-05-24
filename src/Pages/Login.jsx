import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Link, useLocation, useNavigate } from "react-router";
import { RiEyeLine } from "react-icons/ri";
import { RxEyeClosed } from "react-icons/rx";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import ButtonSpinner from "../Components/ButtonSpinner";

const Login = () => {
  const { signInUser, loading, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setEmailError("");
    setPasswordError("");
    setIsLoading(true);

    try {
      await signInUser(email, password);
      setIsLoading(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(location.state?.from || "/", { replace: true });
      });
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Check your email and password please...!", { style: { color: "red" } });
      } else {
        toast.error(error.message || "Login failed! Check your email and password.", { style: { color: "red" } });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged in with Google",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate(location.state?.from || "/", { replace: true });
      });
    } catch (error) {
      toast.error(error.message || "Google login failed!");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="relative">
        <Toaster reverseOrder={false} />

        <div className="flex flex-col items-center justify-center px-4 py-6">
          <div
            data-aos="fade-in"
            data-aos-once="true"
            data-aos-duration="1000"
            className="w-full max-w-2xl mx-auto mt-8"
          >
            <div className="text-base-content bg-base-100 border border-gray-200 rounded-xl shadow-2xs">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold">
                    Login your account
                  </h1>
                  <p className="mt-2 text-sm">
                    Don't have an account yet?
                    <Link
                      to="/register"
                      className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                    >
                      Register here
                    </Link>
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50"
                  >
                    <svg
                      className="w-4 h-auto"
                      width="46"
                      height="47"
                      viewBox="0 0 46 47"
                      fill="none"
                    >
                      <path
                        d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                        fill="#34A853"
                      />
                      <path
                        d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                        fill="#EB4335"
                      />
                    </svg>
                    Login with Google
                  </button>

                  <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                    Or
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm mb-2">
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email address"
                            className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-lime-500 focus:ring-lime-500 focus:outline-none"
                            required
                          />
                        </div>
                        {emailError && (
                          <p className="text-sm text-lime-500 py-1">
                            {emailError}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <label
                            htmlFor="password"
                            className="block text-sm mb-2"
                          >
                            Password
                          </label>
                          <Link
                            to="/forgot-password"
                            className="inline-flex items-center gap-x-1 text-sm text-lime-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative flex items-center rounded-lg border border-gray-200 sm:text-sm focus-within:border-lime-500 focus-within:ring-lime-500">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="py-2.5 sm:py-3 px-4 block w-full border-0 rounded-lg sm:text-sm focus:ring-0 focus:outline-none"
                            required
                          />
                          <span
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lime-500"
                          >
                            {showPassword ? <RiEyeLine /> : <RxEyeClosed />}
                          </span>
                        </div>
                        {passwordError && (
                          <p className="text-sm text-rose-500 py-1">
                            {passwordError}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="flex">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                          />
                        </div>
                        <div className="ms-3">
                          <label htmlFor="remember-me" className="text-sm">
                            Remember me
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-lime-500 btn text-white"
                      >
                        Login
                        {isLoading && <ButtonSpinner />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
