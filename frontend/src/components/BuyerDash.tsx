import { CheckCircle, Clock, Package, User, Mail } from "lucide-react";
import useUser from "./compoAssis/userInfo";
import { motion } from "framer-motion";
import useOrderDetails from "./compoAssis/ordersHook";
import SpinnerContainer from "./SpinnerContainer";
import NoProductOrder from "./compoAssis/NoProductOrder";
const BuyerOrders = () => {
  const {isLoading,orderDetails,allOrder}=useOrderDetails();
  const {data:user}=useUser();
  const myOrders=allOrder?.filter(order => order.buyerId===user?._id && order.buyerId!==order.productIdNumber.createdBy);
  return <>
 <div className={`min-h-screen ${isLoading && "fixed inset-0"} p-6 bg-gray-100`}>
 <SpinnerContainer/>
      <div className="mb-6 flex items-center">
        <div className="bg-white p-4 rounded-lg shadow ">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="mr-2 text-blue-500" /> Buyer: {user?.name}
          </h3>
          <p className="text-gray-600 flex items-center">
          <Mail className="h-5 w-5 text-blue-600 mt-1 ms-1 me-1" /> {user?.email}
          </p>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
      {myOrders && myOrders?.length > 0 ?
       <div className="grid md:grid-cols-2 gap-6">
       <div>
         <h3 className="text-xl font-semibold mb-4 flex items-center">
           <Clock className="mr-2 text-yellow-500" /> Pending Orders
         </h3>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
           {myOrders?.filter(order => (order.orderStatus === "waiting" ||  order.orderStatus==="shipped")).map(order => (
             <div key={order._id} className="bg-white p-4 mb-4 rounded-lg shadow">
               <p className="font-medium">{order.orderTitle}</p>
               <p className="text-gray-600">Price: Rs {order.orderPrice}</p>
               <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
               <p className="text-gray-500 text-sm">Date: {order.createdAt}</p>
               <button onClick={()=>orderDetails(order._id,2)} className="bg-blue-600 rounded text-white p-2 hover:bg-blue-700 mt-2 text-sm font-semibold">See Details</button>
             </div>
           ))}
         </motion.div>
       </div>
       <div>
         <h3 className="text-xl font-semibold mb-4 flex items-center">
           <CheckCircle className="mr-2 text-green-500" /> Received Orders
         </h3>
         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
           {myOrders?.filter(order => order.orderStatus === "delivered").map(order => (
             <div key={order._id} className="bg-white p-4 mb-4 rounded-lg shadow">
               <p className="font-medium">{order.orderTitle}</p>
               <p className="text-gray-600">Price: Rs {order.orderPrice}</p>
               <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
               <p className="text-gray-500 text-sm">Date: {order.createdAt}</p>
               <button onClick={()=>orderDetails(order._id,2)} className="bg-blue-600 rounded text-white p-2 hover:bg-blue-700 mt-2 text-sm font-semibold">See Details</button>
             </div>
           ))}
         </motion.div>
       </div>
     </div>:<NoProductOrder message="No Purchase Yet!" subMessage="You haven't buy any product." buttonLink="/search" buttonText="Start Shopping"/>}
  </div>
  </>
};

export default BuyerOrders;