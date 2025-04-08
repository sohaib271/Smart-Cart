import { useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCreditCard, FaTimes } from "react-icons/fa";
import OnlinePayment from "./OnlinePayment";
import ConfirmOrder from "./ConfirmOrder";
import { Delay } from "./compoAssis/delay";
import { useLoading } from "./loading/loading";
const PaymentPopup = ({ setIsPopupOpen,selectedSize,quantity }: {setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;selectedSize: string;quantity:number;
 }) => {
  const [onlinePay,setOnlinePay]=useState<boolean>(false)
  const [cash,setCash]=useState<boolean>(false);
const {startLoading,stopLoading}=useLoading();
  const forOnlinePay=()=>{
    setOnlinePay(true);
  }
  const forCash=async()=>{
   startLoading();
    await Delay(2);
    setCash(true)
    stopLoading();
  }
  return <>
   <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
  {onlinePay==true?( <OnlinePayment setIsPopupOpen={setIsPopupOpen}/>): cash==true ?( <ConfirmOrder quantity={quantity} selectedSize={selectedSize}  setIsPopupOpen={setIsPopupOpen}/>) :
     <motion.div
     initial={{ opacity: 0, y: -50 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -50 }}
     transition={{ duration: 0.3 }}
     className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center"
   >
     <button
       className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
       onClick={()=> setIsPopupOpen(false)}
     >
       <FaTimes />
     </button>
     <h2 className="text-2xl font-semibold mb-6 text-blue-700">Choose Payment Method</h2>
     <div className="flex flex-col gap-4">
       <button onClick={forCash} className="flex items-center gap-2 bg-blue-800  text-white py-2 px-4 rounded-full">
         <FaMoneyBillWave /> Cash on Delivery
       </button>
       <button disabled onClick={forOnlinePay} className="flex items-center gap-2 bg-blue-800  text-white py-2 px-4 rounded-full">
         <FaCreditCard />Online Payment feature is under development
       </button>
     </div>
   </motion.div>
  } 
    </div>
    </>
};
export default PaymentPopup
