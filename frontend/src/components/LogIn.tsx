import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useUser from "./compoAssis/userInfo";
import AlreadyLoggedInPopup from "./compoAssis/alert";
import SpinnerContainer from "./SpinnerContainer";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
type FormData = {
  email: string;
  password: string;
};
const Login: React.FC = () => {
  const {data:user}=useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const {navigateToPages}=useSelectedProduct();
  const [error,setError]=useState("");
  
  const onSubmit: SubmitHandler<FormData> = async(data) => {
      const response=await fetch(`${import.meta.env.VITE_API_URL}/user/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
   const result=await response.json();
   if(result.error) setError(result.error);
   localStorage.setItem("token",result.token);
   if(result.role==="Seller") navigateToPages("/sellerprofile");
    else if(result.role==="Buyer") navigateToPages(`/buyerprofile/${user?._id}`); 
   else if(result.role==="ADMIN") navigateToPages("/admin");
  
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-5xsm from-blue-500 to-blue-600"
    >
     <SpinnerContainer/>
      {user && <AlreadyLoggedInPopup/>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-center my-1">{error}</p>}
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
          Login
        </button>
        <p className="mt-3 ms-2">Don't have an Account? <span className=" hover:text-blue-400"><Link to="/signup">Sign Up</Link></span></p>
      </form>
    </motion.div>
  );
};
export default Login;