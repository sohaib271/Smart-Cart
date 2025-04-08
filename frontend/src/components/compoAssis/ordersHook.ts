import { Delay } from "./delay";
import { useNavigate } from "react-router-dom";
import useOrders from "./orders";
import { useLoading } from "../loading/loading";
const useOrderDetails=()=>{
  const {data:allOrder}=useOrders();
  const {startLoading,stopLoading,isLoading}=useLoading();
  const navi=useNavigate();
  const orderDetails=async (id,time)=>{
    startLoading();
    await Delay(time)
    navi(`/orderD/${id}`)
    stopLoading();
  }
  return {isLoading,orderDetails,allOrder}
}
export default useOrderDetails;
 