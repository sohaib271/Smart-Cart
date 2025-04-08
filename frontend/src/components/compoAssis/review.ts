import { useQuery } from "@tanstack/react-query";
const fetchReviews=async()=>{
  const response=await fetch(`http://localhost:8000/review/allReviews`);
  if(!response.ok){
    throw new Error("Failed to fetch reviews");
  }
  const result=await response.json();
  return result.review || [];
}
const useReviews=()=>{
  return useQuery({
    queryKey:["reviews"],
    queryFn:fetchReviews,
    retry:false
  })
}
export default useReviews;