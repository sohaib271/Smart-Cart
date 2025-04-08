import { useNavigate } from "react-router-dom";
import { useLoading } from "../loading/loading";
import { Delay } from "./delay";
import { useState } from "react";
const useAddCart=()=>{
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const {startLoading,isLoading,stopLoading}=useLoading();
  const addToCart=async(userId,productId,path)=>{
    startLoading()
    await Delay(2);
    const response=await fetch(`http://localhost:8000/cart/addToCart`,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:productId,userId:userId})});
    const result=await response.json();
    if(result.message) navigate(path); stopLoading();
    return result;
  }
  const addReview=async(productId,userId,review,rating)=>{
    if(rating==0 || review=="") setError("Please rate");
   else {startLoading();
    await Delay(2);
    const response=await fetch(`http://localhost:8000/review/add`,{method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:productId,reviewedBy:userId,review:review,rating:rating})});
    const result=await response.json();
    if(result) stopLoading();
    return result;}
  };
  return {addToCart,error,isLoading,addReview};
}
export default useAddCart;