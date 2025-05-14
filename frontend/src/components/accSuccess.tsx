import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import useUser from "./compoAssis/userInfo";
import { useLoading } from "./loading/loading";
import { Delay } from "./compoAssis/delay";
import SpinnerContainer from "./SpinnerContainer";

const AccountSuccess=()=>{
 const {navigateToPages}=useSelectedProduct();
 const {data:user}=useUser();
 const {startLoading,stopLoading}=useLoading();

 const emptyCart=async()=>{
  startLoading();
  await Delay(2);
  const response=await fetch(`${import.meta.env.VITE_API_URL}/cart/emptycart/${user?._id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});
  const result=await response.json();
  if(result.success){
    stopLoading();
  }
 }

  return (
    <>
    <div className="fabsolute inset-0 bg-white  rounded-2xl shadow-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <SpinnerContainer/>
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
          <button onClick={()=>{navigateToPages(`/buyerprofile/${user?._id}`);
            emptyCart();
          }}
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