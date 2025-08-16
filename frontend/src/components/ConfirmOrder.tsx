import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { MapPin,Phone } from "lucide-react";
import SuccessPopup from "./OrderPlaced";
import { Delay } from "./compoAssis/delay";
import useAllProducts from "./compoAssis/products";
import useUser from "./compoAssis/userInfo";
import { useParams } from "react-router-dom";
import { useLoading } from "./loading/loading";
import AccountSuccess from "./accSuccess";
const ConfirmOrder = ({ setIsPopupOpen, selectedSize,quantity,cash,ePay,payForOne }: { setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>; selectedSize:string;quantity:number;cash:boolean;ePay:boolean;payForOne:()=>void;}) => {
  const [address, setAddress] = useState("");
  const [phone,setPhone]=useState("");
  const [paid,setPaid]=useState(false)
  const [error, setError] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const cancel = () => setIsPopupOpen(false);
  const { data: products } = useAllProducts();
  const { data: user } = useUser();
  const {startLoading,stopLoading}=useLoading();
  const {productId} = useParams()
  const requiredProduct = products?.filter(i => i._id === productId);
  const extractedProduct = requiredProduct?.[0];
  const placedOrder = {
    orderTitle: extractedProduct?.title,
    buyerName: user?.name,
    productIdNumber: extractedProduct?._id,
    buyerEmail: user?.email,
    sellerName: extractedProduct?.createdBy.name,
    sellerEmail: extractedProduct?.createdBy.email,
    orderedFrom: extractedProduct?.createdBy.storeName,
    buyerId: user?._id,
    deliveryAddress: address,
    buyerPhoneNo:phone,
    orderPrice: extractedProduct?.price,
    size:selectedSize,
    quantity:quantity,
    cashOnDelivery:cash,
    onlinePay:ePay,
  };
const confirmOrder = async () => {
  if (address.length < 15 || !address.includes(",")) {
      setError("Invalid Address  Format");
    }else {
      startLoading();
      await Delay(1);
      if (cash==true){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placedOrder),
      });
        const result = await response.json(); 
        if(result.status) setOrderConfirmed(true);
      } 
      else if(ePay==true){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(placedOrder),
      });
        const result=await response.json();
        if(result.status && paid) payForOne();
      } 
    }
    stopLoading();
  };
return (
    <div className="fixed inset-0 bg-black bg-opacity-50  backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6">
      {orderConfirmed ? (
        <SuccessPopup  cancel={cancel} />
      ) : paid ? <AccountSuccess setPaid={setPaid} /> : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg  shadow-lg w-full max-w-md relative"
        >
          <button onClick={cancel} className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800">
            <FaTimes />
          </button>

          <h2 className="text-xl text-blue-700 font-semibold text-center mb-4">Enter Your Address</h2>
          {error && <p className="text-red-500 my-2 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Shipping Address</label>
            <div className="flex items-center border rounded-lg p-3">
              <MapPin className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="City, Town, Street, House No."
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone No (+92)</label>
            <div className="flex items-center border rounded-lg p-3">
              <Phone className="text-gray-500 mr-2" />
              <input
                type="text"
                name="buyerPhoneNo"
                value={phone}
               onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/\D/g, ""); 
                  if (numericValue.length <= 11) {
                    setPhone(numericValue);
                  }
                }}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={confirmOrder}
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-lg"
          >
            Confirm Order
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
export default ConfirmOrder;
