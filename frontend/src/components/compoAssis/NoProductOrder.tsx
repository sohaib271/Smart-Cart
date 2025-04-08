import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { useSelectedProduct } from "./selectedProduct";

interface NoProductOrderProps {
  message: string;
  subMessage: string;
  buttonText: string;
  buttonLink: string;
}
const  NoProductOrder: React.FC<NoProductOrderProps> = ({ message, subMessage, buttonText, buttonLink })=>{
  const {navigateToPages}=useSelectedProduct();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }} 
      className="flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-lg"
    >
      <motion.div 
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.5, yoyo: Infinity }}
        className="text-blue-500 text-4xl font-bold"
      >
        {message}
      </motion.div>
      <p className="text-gray-600 mt-2">{subMessage}</p>
      <Button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700" 
        onClick={() => navigateToPages(buttonLink)}
      >
        {buttonText}
      </Button>
    </motion.div>
  )
}

export default NoProductOrder;