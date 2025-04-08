import { Trash2, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import useUser from "./compoAssis/userInfo";
import SpinnerContainer from "./SpinnerContainer";
import { useLoading } from "./loading/loading";
import { Delay } from "./compoAssis/delay";
import useCart from "./compoAssis/getCart";
const CartPage = () => {
const {startLoading,stopLoading}=useLoading();
const {data:user}=useUser();
const {cartItems}=useCart();
const removeItem = async (id) => {
startLoading();
await Delay(2);
const response=await fetch(`http://localhost:8000/cart/deleteFromCart/${id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});
const result=await response.json();
if(result.message)  stopLoading();
};
return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
     <SpinnerContainer/>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex items-center mb-4">
          <User className="mr-2 text-blue-500" />
          <div>
            <p className="font-semibold">{user?._name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
          <ShoppingCart className="mr-2" /> Your Cart
        </h2>
        {cartItems?.length=== 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems?.map(item => (
              <div key={item?._id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <img src={item?.productId?.productImage} alt={item?.productId?.title} className="w-16 h-16 rounded-lg shadow-md" loading="lazy" />
                  <div className="ml-4">
                    <p className="font-semibold">{item?.productId?.title}</p>
                    <p className="text-blue-500 font-medium">Rs {item?.productId?.price}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-600"
                  onClick={() => removeItem(item?._id)}
                >
                  <Trash2 />
                </motion.button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;