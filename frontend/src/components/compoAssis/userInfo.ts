import { useQuery } from "@tanstack/react-query";
const user=async()=>{ 
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/jwt`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "include"
    });
if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    const result = await response.json();
    return result.user;
  } catch (error) {
    throw error; 
  }
}
  const useUser=()=>{
    return useQuery({
      queryKey:["user"],
      queryFn:user,
      retry:false
    })
  }

  export default useUser;