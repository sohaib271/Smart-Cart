import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import useUser from "./compoAssis/userInfo";
import { Delay } from "./compoAssis/delay";

const AccountSuccess=()=>{
const {navigateToPages}=useSelectedProduct();
const {data:user}=useUser();
const orderDetail=JSON.parse(localStorage.getItem("order"));
const confirmOrder=async()=>{
      await Delay(1);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetail),
    });

    const result=await response.json();
    if (result.status) await navigateToPages(`/buyerprofile/${user?._id}`)
 }
 

  return (
    <>
    <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
  >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 sm:mx-auto transform transition-all animate-popIn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <button className="absolute top-2 right-1 text-xl  text-gray-600 hover:text-gray-800">                      <FaTimes />
      </button>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <CheckCircleIcon 
              className="w-12 h-12 text-blue-600 animate-iconBounce"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Payment Successful!
          </h3>
          <p className="text-gray-600 text-center">
            Thanks for choosing our platform.Happy Shopping!
          </p>
          <button onClick={()=>confirmOrder()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      </motion.div>
    </div>
    </>
  );
};

export default AccountSuccess;