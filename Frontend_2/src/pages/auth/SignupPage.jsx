import { useState } from "react";
import axios from "../api/axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear field-specific error on change
    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFieldErrors({});
      setSuccess("");

      await axios.post("/auth/register", formData);

      setSuccess("Signup successful! You can now log in.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const errors = err.response?.data?.details || {}; // Assume backend sends `{ errors: { fieldName: errorMessage } }`
      setFieldErrors(errors);
    }
  };

  const inputClass = (field) =>
    `peer mt-1 w-full border-b-2 ${
      fieldErrors[field] ? "border-red-500" : "border-gray-300"
    } px-0 py-1 placeholder:text-transparent focus:outline-none ${
      fieldErrors[field] ? "focus:border-red-500" : "focus:border-gray-500"
    }`;

  return (
    <>
      <div className="bg-gray-100 min-h-full flex items-center justify-center">
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Sign Up</h1>
              <p className="mt-2 text-gray-500">
                Register below to access your account
              </p>
            </div>
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                <div className="relative mt-6">
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formData.username}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="John Doe"
                    className={inputClass("username")}
                    required
                  />
                  <label
                    htmlFor="username"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    User Name
                  </label>
                  {fieldErrors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldErrors.username}
                    </p>
                  )}
                </div>

                <div className="relative mt-6">
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formData.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className={inputClass("email")}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Email Address
                  </label>
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="relative mt-6">
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formData.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={inputClass("password")}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Password
                  </label>
                  {fieldErrors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="relative mt-6">
                  <input
                    onChange={(e) => handleChange(e)}
                    value={formData.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className={inputClass("confirmPassword")}
                    required
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Confirm Password
                  </label>
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="my-6">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                  >
                    Sign up
                  </button>
                </div>
                {success && (
                  <p className="text-center text-sm text-green-500">{success}</p>
                )}
                <p className="text-center text-sm text-gray-500">
                  Already have an account?
                  <a
                    href="/login"
                    className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                  >
                    Sign in
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
