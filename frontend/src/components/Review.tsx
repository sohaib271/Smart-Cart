import { useState } from "react";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import useAddCart from "./compoAssis/cart";
const ReviewPopup = ({productId,reviewedBy,setPopUp}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const {addReview,error}=useAddCart();
  const handleStarClick = (value) => {
     setRating(value); 
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-lg p-6 w-80 shadow-lg relative"
      >
        <button 
          onClick={() => setPopUp(false)} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Rate This Product
        </h2>
        <p className="text-red-600 text-center mt-1">{error}</p>
        <div className="flex justify-center my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={30}
              className={`cursor-pointer transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => handleStarClick(star)}
            />
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          minLength={15}
        />
        <button 
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={()=> addReview(productId,reviewedBy,review,rating)}
        >
          Submit Review
        </button>
      </motion.div>
    </div>
  );
};
export default ReviewPopup;
