import { Clock, Truck, CheckCircle } from 'lucide-react';
import useUser from './compoAssis/userInfo';
import Spinner from './Spinner';
import useOrderDetails from './compoAssis/ordersHook';

const SellerOrdersPage: React.FC = () => {
 const {isLoading,orderDetails,allOrder}=useOrderDetails();
  const {data:user}=useUser();
  const getOrderByEmail=allOrder?.filter(order => order.productIdNumber.createdBy===user?._id && order.buyerId!==user?._id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="h-6 w-6 text-blue-500 animate-pulse" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-blue-500 animate-bounce" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen ${isLoading && "fixed inset-0"} bg-white p-6`}>
      {isLoading && (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
      <Spinner />
    </div>
  )}
      <h1 className="text-3xl font-bold text-blue-900 mb-8">{user?.name}'s Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getOrderByEmail?.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-blue-200 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-blue-900">{order.orderTitle}</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-blue-900">
              {getStatusIcon(order.orderStatus)}
              <p className="text-sm">{order.buyerName}</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Order Date: {order.createdAt}</p>
            <button onClick={()=> orderDetails(order._id,2)}  className="bg-blue-600 rounded text-white p-2 hover:bg-blue-700 mt-3 text-sm font-semibold">See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SellerOrdersPage;