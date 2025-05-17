import { useState } from "react";
import useUser from "./compoAssis/userInfo";
import { FiHome, FiBox, FiShoppingCart, FiMenu,FiShoppingBag} from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import useOrderDetails from "./compoAssis/ordersHook";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import SpinnerContainer from "./SpinnerContainer";
import Spinner from "./Spinner";
const SellerDashboard: React.FC = () => {
  const {data:user}=useUser();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
 const {navigateToPages}=useSelectedProduct();
  const storeName: string = user?.role==="Seller" && user?.storeName;
  const {allOrder,isLoading}=useOrderDetails();
   const myOrders=allOrder?.filter(order => order?.productIdNumber?.createdBy===user?._id);

  const fil=myOrders?.filter(order => order?.orderStatus==="waiting" || order?.orderStatus==="shipped");
  const totalSales = myOrders?.filter((order) => order.orderStatus==="delivered").reduce((sum, product) =>{
    const quantity = Number(product.quantity) || 1; 
    return sum + Number(product.orderPrice) * quantity;
  } , 0);

  if(isLoading) return <Spinner/>;
  
  return (
    <div className="flex h-screen">
      <SpinnerContainer/>
       <div className={`bg-gray-900 text-white w-64 p-6 space-y-6 absolute md:relative ${menuOpen ? "left-0" : "-left-64"} md:left-0 transition-all duration-300`}>
         <button onClick={()=>setMenuOpen(false)} className="absolute top-2 left-2 text-xl  text-white-600 hover:text-white-800">                      <FaTimes />
         </button> 
        <div className="flex flex-col items-center space-y-3">
          <img src={user?.storeLogo} alt="Store Logo" loading="lazy" className="w-12 h-12 rounded-full" />
          <h1 className="text-xl font-bold">{storeName}</h1>
        </div>
        <nav className="space-y-4">
          <button onClick={()=>navigateToPages(`/buyerprofile/${user?._id}`)} className="flex items-center space-x-2 hover:text-blue-400">
            <FiHome /> <span>My Boughts</span>
          </button>
         <button onClick={()=> navigateToPages("/sellerproducts")} className="flex items-center space-x-2 hover:text-blue-400">
            <FiBox /> <span>Products</span>
          </button>
          <button onClick={()=> navigateToPages("/sellerorder")} className="flex rounded-full hover: transition-colors relative items-center space-x-2 hover:text-blue-400">
            <FiShoppingCart /> <span>Orders</span>
            {fil?.length > 0 && <span className="absolute -top-2 -right-5 bg-eshop-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{fil?.length}</span>}
          </button>
          <button onClick={() => navigateToPages("/sell")} className="flex items-center space-x-2 hover:text-blue-400">
            <FiShoppingBag /> <span>Add Product</span>
          </button>
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-xl font-semibold">{user?.name}'s Dashboard</h2>
        </header>
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg">Total Sales</h3>
              <p className="text-2xl font-bold">Rs {totalSales}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg">Orders</h3>
              <p className="text-2xl font-bold">{myOrders?.length}</p>
            </div>
            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg">Pending Orders</h3>
              <p className="text-2xl font-bold">{fil?.length}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default SellerDashboard;
