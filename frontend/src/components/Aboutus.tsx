import { motion } from "framer-motion";
import { Briefcase, ShoppingBag, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navi=useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
       <button  onClick={()=> navi(-1)} className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 flex items-center">
        <ArrowLeft size={20} />
      </button>
      <motion.img
        src="/myimage.jpg"
        alt="default picture of user"
        className="w-40 h-30 rounded-full border-4 border-blue-500 shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      loading="lazy"
      />
      <motion.div
        className="mt-6 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Hello, I'm Sohaib</h1>
        <p className="mt-3 text-gray-600 text-lg">
          A passionate entrepreneur and full-stack developer, dedicated to bringing innovation to e-commerce.
          My goal is to create an online shopping experience that is seamless, intuitive, and customer-focused.
        </p>
      </motion.div>
      <motion.div
        className="mt-10 bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-blue-600 flex items-center gap-2">
          <ShoppingBag size={24} /> About My E-Commerce Business
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          My website is built on trust and quality, offering a wide range of products tailored to customer needs.
          With fast delivery, secure payments, and 24/7 support, we aim to provide the best online shopping experience.
        </p>
      </motion.div>
      <motion.div
        className="mt-10 max-w-4xl w-full flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase size={24} /> My Mission
          </h3>
          <p className="mt-3 text-gray-600">
            To revolutionize e-commerce by offering seamless user experiences and personalized recommendations, 
            making shopping smarter and more enjoyable.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User size={24} />My Vision
          </h3>
          <p className="mt-3 text-gray-600">
            To become a leading online marketplace known for trust, innovation, and customer satisfaction, 
            while continuously evolving to meet changing market demands.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default AboutUs;
