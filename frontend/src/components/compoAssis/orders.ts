import { useQuery } from "@tanstack/react-query";
const fetchAllOrders=async()=>{
  const response=await fetch(`${import.meta.env.VITE_API_URL}/order/all`);
  if(!response) throw new Error ("Failed to fetch orders");
  const result=await response.json();
  return result.order || result || [];
}
const useOrders=()=>{
  return useQuery({
    queryKey:["orders","allOrder"],
    queryFn:fetchAllOrders,
    retry:false
  })
}
export default useOrders;