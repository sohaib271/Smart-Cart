import { useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCreditCard, FaTimes } from "react-icons/fa";

import ConfirmOrder from "./ConfirmOrder";
import { Delay } from "./compoAssis/delay";
import { useLoading } from "./loading/loading";
const PaymentPopup = ({ setIsPopupOpen,selectedSize,quantity,payForOne }: {setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;selectedSize: string;quantity:number;payForOne:()=>void;
 }) => {
  const [cash,setCash]=useState<boolean>(false);
  const [ePay,setEpay]=useState<boolean>(false);
  const [confirm,setConfirm]=useState<boolean>(false);
const {startLoading,stopLoading}=useLoading();
  
  const forCash=async()=>{
   startLoading();
    await Delay(2);
    setCash(true)
    setConfirm(true);
    stopLoading();
  }

  const online=async()=>{
    startLoading();
    await Delay(1);
    setEpay(true);
    setConfirm(true)
    stopLoading();
  }
  return <>
   <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
  { confirm==true?( <ConfirmOrder payForOne={payForOne} cash={cash} ePay={ePay} quantity={quantity} selectedSize={selectedSize}  setIsPopupOpen={setIsPopupOpen}/>) :
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
       <button onClick={online} className="flex items-center gap-2 bg-blue-800  text-white py-2 px-4 rounded-full">
         <FaCreditCard />Pay Online
       </button>
     </div>
   </motion.div>
  } 
    </div>
    </>
};
export default PaymentPopup
