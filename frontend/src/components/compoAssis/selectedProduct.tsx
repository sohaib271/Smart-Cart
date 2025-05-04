import { useNavigate } from "react-router-dom";
import { Delay } from "./delay";
import { useLoading } from "../loading/loading";
export const useSelectedProduct = () => {
  const {startLoading,stopLoading,isLoading}=useLoading();
  const navigate = useNavigate(); 
  const selectProduct = async (id: string) => {
    startLoading();
    await Delay(3); 
    navigate(`/productdetails/${id}`);
   stopLoading();
  };
  const navigateToPages=async(path)=>{
    startLoading();
    await Delay(1); 
    navigate(path);
   stopLoading();
  };
  const handleConnectStripe = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-connect-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id 
        }),
      });
  
      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      alert('Something went wrong.');
    }
  };
  return {selectProduct,navigateToPages,isLoading,handleConnectStripe};
};
