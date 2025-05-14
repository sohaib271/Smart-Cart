import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Lock, Store, CreditCard,MapPin } from "lucide-react";
import { useState } from "react";
import { useLoading } from "./loading/loading";
import SpinnerContainer from "./SpinnerContainer";
import { useSelectedProduct } from "./compoAssis/selectedProduct";

interface SellerFormData {
  name: string;
  storeName: string;
  email: string;
  password: string;
  address: string;
  storeLogo: FileList;
  paymentMethod: "jazzcash" | "easypaisa" | "payoneer";
}

const SellerSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SellerFormData>();
  const {startLoading,stopLoading}=useLoading();
  const [error,setError]=useState("")
  const {navigateToPages}=useSelectedProduct();


  const onSubmit = async (data: any) => {
    try {
      startLoading();
  
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("storeName", data.storeName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("address", data.address);
      formData.append("payment", data.paymentMethod);
      formData.append("role", "Seller");
  
      if (data.storeLogo?.length) {
        formData.append("storeLogo", data.storeLogo[0]);
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        body: formData,
      });
      const result=await response.json();
      if(result.err) setError(result.err); 
      else navigateToPages("/log in");
    } catch (error) {
      setError(error.message);
    } finally {
      stopLoading();
    }
  };
  

  return (
    <div className="flex items-center p-6 justify-center min-h-screen bg-gray-100">
    <SpinnerContainer/>
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl text-blue-700 font-bold text-center mb-4">Seller Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-red-500 text-sm my-3">{error}</p>
          <div>
            <label className="block text-gray-700">Full Name</label>
            <div className="flex items-center border rounded p-2">
              <User className="text-gray-500 mr-2" />
              <input
                type="text"
                {...register("name", { required: "Full name is required" })}
                className="w-full outline-none"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Store Name</label>
            <div className="flex items-center border rounded p-2">
              <Store className="text-gray-500 mr-2" />
              <input
                type="text"
                {...register("storeName", { required: "Store name is required" })}
                className="w-full outline-none"
              />
            </div>
            {errors.storeName && <p className="text-red-500 text-sm">{String(errors.storeName.message)}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border rounded p-2">
              <Mail className="text-gray-500 mr-2" />
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full outline-none"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border rounded p-2">
              <Lock className="text-gray-500 mr-2" />
              <input
                type="password"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                className="w-full outline-none"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <div className="flex items-center border rounded p-2">
              <MapPin className="text-gray-500 mr-2" />
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full outline-none"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm">{String(errors.address.message)}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Store Logo</label>
            <input
              type="file"
              {...register("storeLogo")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Payment</label>
            <div className="flex items-center border rounded p-2">
              <CreditCard className="text-gray-500 mr-2" />
              <select
                {...register("paymentMethod", { required: "Payment m is required" })}
                className="w-full outline-none"
              >
                <option value="jazzcash">Jazz Cash</option>
                <option value="easypaisa">Easy Paisa</option>
                <option value="payoneer">Payoneer</option>
              </select>
            </div>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{String(errors.paymentMethod.message)}</p>}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default SellerSignup;