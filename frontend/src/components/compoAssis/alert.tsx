import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "./userInfo";
const AlreadyLoggedInPopup = () => {
  const navigate = useNavigate();
  const {data:user}=useUser();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white text-center p-6 rounded-2xl shadow-lg max-w-sm w-full border-t-4 border-blue-600"
      >
        <CheckCircle size={50} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">{user?"You are already logged in":"Please Log in."}</h2>
        <p className="text-gray-600 mt-2">{user?"You don't need to sign in again.":"You cannot buy anything without logging in."}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-5 px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          {user?"Go back to Home Page":"Go back to Home Page for Log In"}
        </button>
      </motion.div>
    </div>
  );
};
export default AlreadyLoggedInPopup;
