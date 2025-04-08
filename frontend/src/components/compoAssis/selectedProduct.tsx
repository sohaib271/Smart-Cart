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
    await Delay(2); 
    navigate(path);
   stopLoading();
  }
  return {selectProduct,navigateToPages,isLoading} ;
};
