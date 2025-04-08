import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Delay } from "./compoAssis/delay";
import SpinnerContainer from "./SpinnerContainer";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import { useLoading } from "./loading/loading";
type FormData = {
  name:string,
  email: string;
  password: string;
};
const BuyerSignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState("")
 const {navigateToPages}=useSelectedProduct();
 const {startLoading,stopLoading}=useLoading();
  const onSubmit: SubmitHandler<FormData> =async (data) => {
    startLoading();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", "Buyer");  
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        navigateToPages("/log in");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    stopLoading();
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center from-blue-500 to-blue-600"
    >
      <SpinnerContainer/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Sign Up
        </h2>
        <p className="text-red-500 text-sm my-3">{error}</p>
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <div className="flex items-center rounded mb-3 ">
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                placeholder="Enter Name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
          </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
        <p className="mt-3 ms-2">Already have an account? <span className=" hover:text-blue-400"><Link to="/log in">Click to Log in</Link></span></p>
      </form>
    </motion.div>
  );
};
export default BuyerSignUp;