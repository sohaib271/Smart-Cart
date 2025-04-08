import { useQuery } from "@tanstack/react-query";
import useUser from "./userInfo";
const getCart = async (userId) => {
  if (!userId) return []; 
  const response = await fetch(`http://localhost:8000/cart/getCart/${userId}`);
  const result = await response.json();
  return result || [];
};
const useCart = () => {
  const { data: user } = useUser(); 
  const { data: cartItems, isLoading, error, refetch } = useQuery({
    queryKey: ["cart", user?._id], 
    queryFn: () => getCart(user?._id),
    enabled: !!user?._id,
    retry: false,
  });
  return { cartItems, isLoading, error, refetch }; 
};
export default useCart;
