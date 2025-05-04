import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FiImage, FiFileText, FiCreditCard, FiPackage, FiGrid, FiTag, FiUser, FiCheckSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { DollarSign, Phone } from 'lucide-react';
import useUser from './compoAssis/userInfo';
import { useNavigate } from 'react-router-dom';
import SpinnerContainer from './SpinnerContainer';
import { useLoading } from './loading/loading';
interface FormData {
  title: string;
  description: string;
  productImage: FileList;
  accountNumber: string;
  price: string;
  category: string;
  features: string;
  useCase: string;
  targetedAudience: string;
  brand: string;
  priceRange:string;
  contactNo:string,
}
const ProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState("");
  const {startLoading,stopLoading}=useLoading();
  

  const navi = useNavigate();
  const { data: user } = useUser();
  const categories = ["Computing", "Audio", "Wearable", "Gadgets", "Clothing", "Sports", "Mobile Accessories", "Kithen Use", "Skin Care"];
  const useCases = ["Gaming", "Work", "Travel", "Daily Use", "Professional", "Events"];
  const audiences = ["Students", "Gamers", "Professionals", "Travelers", "Athletes","Men", "Women", "Kids", "All"];
  const priceRange=["Budget","Mid-Range","Premium"]
  const onSubmit = async (data: FormData) => {
    startLoading()
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("accountNumber", data.accountNumber);
    formData.append("productImage", data.productImage[0]);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("createdBy", user?._id);
    formData.append("description", data.description);
    formData.append("features", data.features);
    formData.append("useCase", data.useCase);
    formData.append("targetedAudience", data.targetedAudience);
    formData.append("brand", data.brand);
    formData.append("priceRange", data.priceRange);
    formData.append("contactNo",data.contactNo)
    const response = await fetch("http://localhost:8000/product/form", { method: "POST", body: formData });
    const result = await response.json();
    if (result.success) navi("/sellerprofile");
    else setError(result.error);
    stopLoading();
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <SpinnerContainer/>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10"
      >
        <h2 className="text-2xl text-blue-700 font-bold text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <div>
            <label className="block text-gray-700 mb-1">Product Title</label>
            <div className="flex items-center border p-2 rounded">
              <FiPackage className="text-gray-500 mr-2" />
              <input {...register("title", { required: "Product title is required" })} className="w-full outline-none" />
            </div>
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price in PKR</label>
            <div className="flex items-center border p-2 rounded">
              <DollarSign className="text-gray-500 text-sm mr-2" />
              <input type="number" {...register("price", { required: "Price required" })} className="w-full outline-none" />
            </div>
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <div className="flex items-center border rounded p-2">
              <FiGrid className="text-gray-500 mr-2" />
              <select {...register("category",{required: "Please select category"})} className="w-full outline-none">
                <option value="">Select Category</option>
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Product Description</label>
            <div className="flex items-center border p-2 rounded">
              <FiFileText className="text-gray-500 mr-2" />
              <textarea {...register("description", { required: "Description is required", minLength: { value:30, message: "Description must be at least 30 characters" }  })} className="w-full outline-none" />
            </div>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Features</label>
            <div className="flex items-center border p-2 rounded">
              <FiCheckSquare className="text-gray-500 mr-2" />
              <input {...register("features", { required: "Features are required" })} className="w-full outline-none" />
            </div>
            {errors.features && <p className="text-red-500 text-sm">{errors.features.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price Range</label>
            <div className="flex items-center border rounded p-2">
              <FiTag className="text-gray-500 mr-2" />
              <select {...register("priceRange", {required:"Select Range"})} className="w-full outline-none">
                <option value="">Select Range</option>
                {priceRange.map(use => <option key={use} value={use}>{use}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Use Case</label>
            <div className="flex items-center border rounded p-2">
              <FiTag className="text-gray-500 mr-2" />
              <select {...register("useCase", {required:"Select UseCase"})} className="w-full outline-none">
                <option value="">Select Use Case</option>
                {useCases.map(use => <option key={use} value={use}>{use}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Targeted Audience</label>
            <div className="flex items-center border rounded p-2">
              <FiUser className="text-gray-500 mr-2" />
              <select {...register("targetedAudience", {required:"Select targeted audience"})}  className="w-full outline-none">
                <option value="">Select Audience</option>
                {audiences.map(audience => <option key={audience} value={audience}>{audience}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Brand (optional)</label>
            <div className="flex items-center border p-2 rounded">
              <FiTag className="text-gray-500 mr-2" />
              <input {...register("brand")} className="w-full outline-none" />
            </div>
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center border p-2 rounded">
              <FiImage className="text-gray-500 mr-2" />
              <input
                type="file"
                {...register("productImage", { required: "Product image is required" })}
                className="w-full"
              />
            </div>
            {errors.productImage && <p className="text-red-500 text-sm">{errors.productImage.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Account Number </label>
            <div className="flex items-center border p-2 rounded">
              <FiCreditCard className="text-gray-500 mr-2" />
              <input placeholder='e.g JazzCash, EasyPaisa, Payoneer' {...register("accountNumber", { required: "Account Number required" })} className="w-full outline-none" />
            </div>
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Phone No (+92) </label>
            <div className="flex items-center border p-2 rounded">
              <Phone size={20} className="text-gray-500  mr-2" />
              <input  {...register("contactNo", { required: "Phone Number required" })} className="w-full outline-none" />
            </div>
            {errors.contactNo && <p className="text-red-500 text-sm">{errors.contactNo.message}</p>}
          </div>
          <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-700 font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default ProductForm;
