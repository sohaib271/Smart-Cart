import { useQuery } from "@tanstack/react-query";
const baseUrl=import.meta.env.VITE_API_URL;
const fetchAllProducts = async () => {
  const response = await fetch(`${baseUrl}/product/allProducts`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const result = await response.json();
  return result.product || [];
};
const useAllProducts = () => {
  return useQuery({
    queryKey: ["products", "all"], 
    queryFn: fetchAllProducts,
    retry: false,
  });
};
export default useAllProducts;