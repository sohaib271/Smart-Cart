import { useQuery } from "@tanstack/react-query";
const fetchAllProducts = async () => {
  const response = await fetch(`http://localhost:8000/product/allProducts`);
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