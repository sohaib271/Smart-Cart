import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Privacy Policy</h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-700"
        >
          Welcome to <b className="text-blue-700">Smart Cart</b>. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </motion.p>
        
        <div className="mt-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">1. Information We Collect</h2>
            <p className="text-gray-600">We collect personal information that you provide to us, including your name, email, phone number, and any other details necessary for using our services.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">2. How We Use Your Information</h2>
            <p className="text-gray-600">We use your data to provide services, improve user experience, send important updates, and ensure website security.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">3. Sharing Your Information</h2>
            <p className="text-gray-600">We do not sell your personal data. However, we may share information with trusted third parties to enhance our services.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-xl font-semibold text-gray-800">4. Security</h2>
            <p className="text-gray-600">We take necessary security measures to protect your information from unauthorized access or disclosure.</p>
          </motion.div>
        </div>

        <p className="text-center text-gray-500 mt-6">For any questions regarding this Privacy Policy, contact us at @eshopsupport.com</p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
