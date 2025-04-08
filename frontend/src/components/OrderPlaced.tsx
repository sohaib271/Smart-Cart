import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import useUser from "./compoAssis/userInfo";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
const SuccessPopup = ({cancel}:{cancel:()=> void;}) => {
  const {data:user}=useUser();
  const {navigateToPages}=useSelectedProduct();
  return (
    <>
    <div className="fabsolute inset-0 bg-white  rounded-2xl shadow-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }}
  >
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 transform transition-all animate-popIn">
      <button onClick={cancel} className="absolute top-2 right-1 text-xl  text-gray-600 hover:text-gray-800">                      <FaTimes />
      </button>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <CheckCircleIcon 
              className="w-12 h-12 text-blue-600 animate-iconBounce"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Order Placed Successfully!
          </h3>
          <p className="text-gray-600 text-center">
            Your order has been confirmed. Please check your profile page
            to track the order status.
          </p>
          <button onClick={()=>navigateToPages(`/buyerprofile/${user?._id}`)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Profile
          </button>
        </div>
      </div>
      </motion.div>
    </div>
    </>
  );
};
export default SuccessPopup;