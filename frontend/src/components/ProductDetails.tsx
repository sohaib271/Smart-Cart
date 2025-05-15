import { useState } from "react";
import { Star, ShoppingCart, MessageCircle, Truck, PlusCircle, MinusCircle, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import {loadStripe} from "@stripe/stripe-js"
import useAllProducts from "./compoAssis/products";
import PaymentPopup from "./PayMentmethod";
import { useParams } from "react-router-dom";
import SpinnerContainer from "./SpinnerContainer";
import useUser from "./compoAssis/userInfo";
import useOrders from "./compoAssis/orders";
import useReviews from "./compoAssis/review";
const ProductDetails = () => {  
  const { data: products } = useAllProducts();
  const {data:allOrders}=useOrders();
  const {data:reviews}=useReviews();
  const {data:user}=useUser();
  const [err,setErr]=useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); 
  const { productId } = useParams();
  const requiredProduct = products?.filter(p => p?._id === productId);
  const extractedProduct = requiredProduct?.[0];
  const [quantity, setQuantity] = useState<number>(1);
  const productWithQuantity = extractedProduct
  ? { ...extractedProduct, quantity }
  : null;

  let totalOrders=0;
  let orderQuantity=0;

  allOrders?.forEach(o => {
    if(o?.productIdNumber?._id===productId && o?.orderStatus=="delivered"){
      totalOrders++;
      orderQuantity+=o?.quantity || 1;
    }
  });

  const noOfSolds=totalOrders * quantity;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const payForOne=async()=>{
    try {
      const stripe = await stripePromise;
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/stripe/payment/1`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ productWithQuantity }),
      });
  
  
      const data = await res.json();
  
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });
  
      if (error) {
        console.error('Stripe redirect error:', error);
      }
      
    } catch (err) {
      console.error('Payment error:', err);
    }
  }

  const [selectedSize, setSelectedSize] = useState<string>((extractedProduct?.category==="Shoes" || extractedProduct?.category==="Clothing")?"Medium":"None"); 
  const review=reviews?.filter(r => r.productId===productId);
  const getSizeLength = (size: string) => {
    const sizeMap: Record<string, string> = {
      Small: extractedProduct?.category=="Shoes"?"60 cm":" 150-165 cm",
      Medium: extractedProduct?.category=="Shoes"?"65 cm":" 170-175 cm",
      Large: extractedProduct?.category=="Shoes"?"70 cm":" 175-182 cm",
      XL:extractedProduct?.category=="Shoes"?"75 cm":" 182-190 cm",
    };
    return sizeMap[size] || 0;
  };
  const increaseQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const priceConfiguration=()=>{
    if(productWithQuantity?.price * productWithQuantity?.quantity <= 700){
      setErr("Please make purchase above Rs 700.")
    }else{
      setIsPopupOpen(user?true:false)
    }
  }
  return (
    <>
      {(isPopupOpen) && <PaymentPopup payForOne={payForOne} selectedSize={selectedSize} quantity={quantity} setIsPopupOpen={setIsPopupOpen} />}
     <SpinnerContainer/>
      <div className={`min-h-screen ${isPopupOpen && "fixed inset-0"} flex flex-col items-center bg-gray-100 p-4 sm:p-6`}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.img
              src={extractedProduct?.productImage}
              alt={`image of ${extractedProduct?.title}`}
              loading="lazy"
              className="rounded-lg shadow-md w-full max-w-xs"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
          <p className="text-end text-gray-400">{noOfSolds} sold</p>
            <h2 className="text-2xl font-bold mb-2">{extractedProduct?.title}</h2>
            <p className="text-lg text-blue-500 font-semibold">Rs {extractedProduct?.price}</p>
            <p className="text-gray-700 mt-2">{extractedProduct?.description}</p>
            <div className="flex items-center mt-4">
              <button onClick={decreaseQuantity} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <MinusCircle size={20} className="text-gray-700" />
              </button>
              <input
                type="text"
                className="w-12 text-center text-lg font-semibold mx-2 border border-gray-300 rounded"
                value={quantity}
                readOnly
              />
              <button onClick={increaseQuantity} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <PlusCircle size={20} className="text-gray-700" />
              </button>
            </div>
           {(extractedProduct?.category==="Shoes" ||extractedProduct?.category==="Clothing") &&  <div className="mt-4">
              <label className="block text-gray-700 font-semibold">Size:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
              </select>
              <div className="mt-2 flex items-center text-gray-700">
              <Ruler className="mr-2 text-blue-500" size={20} />
              <p>Length: {getSizeLength(selectedSize)}</p>
            </div>
            </div>}          
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!user || (user?._id===extractedProduct?.createdBy?._id)?true:false}
              onClick={priceConfiguration}
              className="mt-4 w-full bg-blue-700 text-white p-2 rounded flex items-center justify-center hover:bg-blue-600"
            >
              <ShoppingCart className="mr-2" /> Buy Now
            </motion.button>
            {!user?<p className="text-red-500 mt-2">Log in to buy best products at best rates.</p>:user?._id==extractedProduct?.createdBy?._id?<p className="text-red-500 mt-2">You cannot buy your own product</p>:<p></p>}
            <p className="text-red-500 mt-2">{err}</p>
            <div className="flex p-2 justify-end text-gray-500 text-sm">
              <Truck size={20} />
              <p className="ms-1">Free Shipping</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-4xl">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          {review?review.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-3 mb-3">
              <p className="font-semibold flex items-center">
                <MessageCircle className="mr-2 text-blue-500" /> {review?.reviewedBy?.name}
              </p>
              <p className="text-yellow-500 flex">
                {[...Array(review?.rating)].map((_, i) => (
                  <Star key={i} />
                ))}
              </p>
              <p className="text-gray-600">{review?.review}</p>
            </div>
          )):<p className="text-gray-600">No reviews yet.</p>}
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
