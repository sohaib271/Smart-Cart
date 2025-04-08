import { useState } from "react";
import { FaTimes} from "react-icons/fa";
import { motion } from "framer-motion";

const OnlinePayment = ({ setIsPopupOpen }: {setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
})  => {
  const [screenshot] = useState<File | null>(null);

  const camcel = () => {
    setIsPopupOpen(false)
  };
  return (
    <div className="fabsolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center"
      >
        <button onClick={camcel}
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Payment Details</h2>
        <p className="mb-4">Account Name: Seller XYZ</p>
        <p className="mb-4">Account Type: JazzCash</p>
        <p className="mb-4">Account Number: 1234-5678-9101</p>
        <p className="mb-6">Payable Amount: PKR 5000</p>
        <label className="block mb-4">
          Upload Payment Screenshot:
          <input type="file" className="mt-2" />
        </label>
        {screenshot && (
          <p className="text-sm text-green-600 mb-4">Screenshot uploaded successfully!</p>
        )}
<motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // onClick={handleConfirmOrder}
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm Payment
            </motion.button>
      </motion.div>
    </div>
  );
};
export default OnlinePayment;