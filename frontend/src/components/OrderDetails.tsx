import React, { useEffect, useState } from 'react';
import { Clock, Truck, CheckCircle, Mail, MapPin, Package, Phone,UserRound } from 'lucide-react';
import useUser from './compoAssis/userInfo';
import { Delay } from './compoAssis/delay';
import { useParams } from 'react-router-dom';
import useOrderDetails from './compoAssis/ordersHook';
import SpinnerContainer from './SpinnerContainer';
import { useLoading } from './loading/loading';
import ReviewPopup from './Review';
import useReviews from './compoAssis/review';
const OrderDetailPage: React.FC = () => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [popUp,setPopUp]=useState(false);
const {startLoading,stopLoading,isLoading}=useLoading();
  const {data:user}=useUser();
  const {allOrder}=useOrderDetails();
  const {data:allReviews}=useReviews();
  const [error,setError]=useState("")
  const {orderId}=useParams();
  const reqOrder=allOrder?.find(order => order._id===orderId )
  const [currentStatus, setCurrentStatus] = useState<'waiting' | 'shipped' | 'delivered'>(reqOrder?.orderStatus);
  const image=reqOrder?.productIdNumber.productImage;
  const total=Number(reqOrder?.orderPrice) * reqOrder?.quantity;
 const reviewed=allReviews?.find(review => review.productId === reqOrder?.productIdNumber._id && review.reviewedBy._id === user?._id);
  const reviewable = reqOrder?.orderStatus === 'delivered' && reqOrder?.buyerId === user?._id;
  const reviewPopup = reviewable && !reviewed;
  
  
  useEffect(()=>{
    if(reviewPopup){
      setShowReviewPopup(true);
      setPopUp(true);
    }
  },[])
  const updateStatus=async(id,orderStatus)=>{
    startLoading();
    await Delay(3);
    const response=await fetch(`${import.meta.env.VITE_API_URL}/order/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:orderStatus})});
    const result=await response.json();
    if(result){
      try {
        setCurrentStatus(reqOrder._id===id && orderStatus);
        stopLoading()
      } catch (error:any) {
        if(error.result && error.result.message){
          setError(error.result.message)
        }else{
          setError("Something went wrong. Try again later!")
        }
      }
    }
    try {
      setCurrentStatus(reqOrder._id===id && orderStatus);
      stopLoading()
    } catch (error:any) {
      if(error.result && error.result.message){
        setError(error.result.message)
      }else{
        setError("Something went wrong. Try again later!")
      }
    }
    stopLoading()
  }
  const statusIcons = {
    waiting: <Clock className="h-6 w-6 text-blue-500 animate-pulse" />,
    shipped: <Truck className="h-6 w-6 text-yellow-500 animate-bounce" />,
    delivered: <CheckCircle className="h-6 w-6 text-green-500" />
  };
  const statusColors = {
    waiting: 'bg-blue-100 text-blue-800',
    shipped: 'bg-yellow-100 text-yellow-800',
    delivered: 'bg-green-100 text-green-800'
  };
  return (
    <>
      <div className={`min-h-screen ${isLoading && "fixed inset-0"} bg-white p-6 md:p-8`}>
           {(showReviewPopup && popUp) && <ReviewPopup setPopUp={setPopUp} productId={reqOrder?.productIdNumber} reviewedBy={user?._id} />}
      <SpinnerContainer/>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <Package className="h-8 w-8" />
          Order Details
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-900">{reqOrder?.orderTitle}</h2>
              {(reqOrder?.productIdNumber.createdBy !== user?._id)? <h3 className="text-xl font-semibold text-blue-900">Ordered from : {reqOrder?.orderedFrom}</h3>:<h3 className="text-xl font-semibold text-blue-900">Ordered By : {reqOrder?.buyerName}</h3> }
              <p className="text-gray-600 text-sm mt-1">Order ID: {reqOrder?._id}</p>
            </div>
            <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${statusColors[reqOrder?.orderStatus]} text-sm font-medium flex items-center gap-2`}>
              {statusIcons[reqOrder?.orderStatus]}
              {reqOrder?.orderStatus.charAt(0).toUpperCase() + reqOrder?.orderStatus.slice(1)}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <img 
                src={image} 
                alt={`image of ${reqOrder?.orderTitle}`} 
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                loading='lazy'
              />
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {(reqOrder?.category==="Shoes" || reqOrder?.category ==="Clothing") &&  <div className="flex justify-between">
                    <span className="text-gray-600">Size :</span>
                    <span className="font-medium"> {reqOrder?.size}</span>
                  </div> }
                <div className="flex justify-between">
                    <span className="text-gray-600">Unit Price :</span>
                    <span className="font-medium">Rs {reqOrder?.orderPrice}</span>
                  </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Quanitity :</span>
                    <span className="font-medium"> {reqOrder?.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal :</span>
                    <span className="font-medium">Rs {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping :</span>
                    <span className="font-medium">Rs 0</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-blue-900 font-semibold">Total :</span>
                    <span className="text-blue-900 font-semibold">Rs {total}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Customer Details</h3>
                <div className="space-y-3">
                <div className="flex items-start gap-2">
                    <UserRound  className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Name</p>
                      <p className="text-gray-600 whitespace-pre-line">{reqOrder?.buyerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Email</p>
                      <p className="text-gray-600 break-all">{reqOrder?.buyerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Delivery Address</p>
                      <p className="text-gray-600 whitespace-pre-line">{reqOrder?.deliveryAddress}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone  className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-blue-900">Contact No</p>
                      <p className="text-gray-600 whitespace-pre-line">{reqOrder?.buyerPhoneNo}</p>
                    </div>
                  </div>
                </div>
              </div>
             {user?.role ==="Seller" && reqOrder?.buyerId!==user?._id ?
              <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Update Status</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => updateStatus(reqOrder?._id,'shipped')}
                  disabled={currentStatus === 'shipped' || currentStatus === 'delivered'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStatus === 'shipped' || currentStatus === 'delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  Mark as Shipped
                </button>
                <button
                  onClick={() => updateStatus(reqOrder?._id,'delivered')}
                  disabled={currentStatus === 'delivered'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentStatus === 'delivered'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  Mark as Delivered
                </button>
              </div>
            </div>:(reqOrder?.orderStatus ==="waiting")?<p>Once seller shipped your order. You will get it in 3-5 days</p>:reqOrder?.orderStatus ==="delivered"?<p>Thanks for purchasing the product. Happy Shoppping!</p>:reqOrder?.orderStatus==="shipped" && reqOrder?.status!=="Paid"?<p className='text-sm'>Your order has been shipped. Please be ready with Rs {total}</p>:<p>Your payment is done. The rider is on its way to deliver your order.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default OrderDetailPage;