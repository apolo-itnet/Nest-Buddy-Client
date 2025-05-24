import { FaCamera } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { RxEyeClosed } from "react-icons/rx";
import { RiEyeLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const { createUser, setUser, updateUser, signInWithGoogle } =
    useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
    if (!/\d/.test(password)) errors.push("One number");
    if (!/[@$!%*?&]/.test(password)) errors.push("One special character");
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, confirmPassword, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    setNameError("");
    setEmailError("");
    setPasswordError([]);
    setConfirmPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      toast.error("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      toast.error("Please enter a valid email");
      return;
    }

    // if (name.length < 5) {
    //   setNameError("Enter Full Name (at least 5 characters)");
    //   toast.error("Name must be at least 5 characters");
    //   return;
    // }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setPasswordError(passwordErrors);
      toast.error("Please fix password requirements");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    //Create user in the Firebase
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        const userProfile = {
          email, 
          name: restFormData.name,
          photoURL: result.user?.photoURL,
          uid: result.user?.uid,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Account Registration Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        //Save users info in the MongoDB Database
        fetch("https://roommates-finder-server-six.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after profile save", data);
          });
        // form.reset();
        // navigate(location.state?.from || "/", { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Your Account Registration Failed, Please Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const gResult = await signInWithGoogle();
      toast.success("Successfully signed in with Google!", {
        style: { color: "green" },
      });
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error(error.message || "Google Sign-In failed!");
    }
  };

  return (
    <div>
      <Toaster reverseOrder={false} />
      <div className="relative w-full mx-auto max-w-3xl responsive-padding text-base-content bg-base-100 ">
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
          className=" mt-7 border border-base-300 rounded-xl shadow-2xs"
        >
          <div className="p-4 sm:p-7 mx-auto">
            <div className="text-center">
              <h1 className="block text-2xl font-bold ">
                Register your account
              </h1>
              <p className="mt-2 text-sm ">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-base-200   shadow-2xs hover:bg-base-300 focus:outline-hidden focus:bg-gray-50"
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
                Sign up with Google
              </button>

              <div className="py-3 flex items-center text-xs  uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
                Or
              </div>

              {/* Form */}
              <form onSubmit={handleRegister}>
                <div className="grid gap-y-4">
                  {/* Form Group - name */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* First-Name */}
                    <div>
                      <label className="block text-sm mb-2">First Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fname"
                          name="firstName"
                          placeholder="First Name"
                          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                          required
                        />
                        {nameError && (
                          <p className="text-sm text-red-500 py-1 pl-4">
                            {nameError}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Last-Name */}
                    <div>
                      <label className="block text-sm mb-2">Last Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="lname"
                          name="lastName"
                          placeholder="Last Name"
                          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Group - email, photo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Form Group - email */}
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                          required
                        />
                        {emailError && (
                          <p className="text-sm text-red-500 py-1">
                            {emailError}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* End Form Group */}

                    {/* Form Group - photo */}
                    <div>
                      <label
                        htmlFor="photo"
                        className="text-sm mb-2 flex items-center gap-2"
                      >
                        Photo URL{" "}
                        <span className="text-lime-500">
                          <FaCamera />
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="photo-url"
                          name="photo"
                          placeholder="Your Photo URL"
                          className="py-2.5 sm:py-3 px-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                          required
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                  </div>

                  {/* Form Group - password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Form Group - password */}
                    <div>
                      <label htmlFor="password" className="block text-sm mb-2">
                        Password
                      </label>
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
                      {passwordError.length > 0 && (
                        <ul className="text-sm text-red-500 py-1">
                          {passwordError.map((err, idx) => (
                            <li key={idx}>- {err}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* End Form Group */}

                    {/* Form Group - confirm password */}
                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="py-2.5 sm:py-3 px-4 w-full border border-gray-200 rounded-lg sm:text-sm focus:outline-none focus:border-lime-500 focus:ring-lime-500"
                          required
                        />
                        <span
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-lime-500"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <RiEyeLine />
                          ) : (
                            <RxEyeClosed />
                          )}
                        </span>
                      </div>
                      {confirmPasswordError && (
                        <p className="text-sm text-red-500 py-1">
                          {confirmPasswordError}
                        </p>
                      )}
                    </div>

                    {/* End Form Group */}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-lime-200 rounded-sm text-blue-600 focus:ring-lime-500"
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm">
                        I accept the{" "}
                        <a
                          className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  {/* End Checkbox */}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-lime-500 btn shadow-none border-none text-white"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
