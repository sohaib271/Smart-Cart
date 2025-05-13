import { useState } from "react";
import useAllProducts from "./compoAssis/products";
import { ShoppingCart, Heart, Star} from "lucide-react";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import useAddCart from "./compoAssis/cart";
import useUser from "./compoAssis/userInfo";
import SpinnerContainer from "./SpinnerContainer";
const ProductsPage = () => {
  const {selectProduct}=useSelectedProduct();
  const {addToCart}=useAddCart();
  const { data: allProducts } = useAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const {data:user}=useUser();
const navi=useNavigate();
  const filteredProducts = allProducts?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) || product.createdBy.storeName.toLowerCase().includes(searchTerm.toLowerCase()) || product?.brand?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  return (
    <>
    <Navbar />
    <SpinnerContainer/>
    <div className="p-4 mt-[80px]">
      <input
        type="text"
        placeholder="Search products by brand, specs, stores etc"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-[350px] mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredProducts?.map(product => (
            <motion.div 
              key={product._id}
              className="glass-card group p-4  hover:shadow-lg"
              variants={itemVariants}
            >
              <div className="relative h-64 overflow-hidden rounded-xl mb-4">
                <img 
                  src={product.productImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                  <Heart size={16} className="text-eshop-blue-600" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {(product.createdBy._id !== user?._id && user) && <button onClick={()=>addToCart(user?._id,product._id)} className="w-full bg-white text-eshop-blue-600 font-medium py-2 rounded-lg flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-eshop-blue-600">
                  {product.category}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-eshop-blue-600 transition-colors">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-900">Rs {product.price}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                    <img
                      src={product.createdBy?.storeLogo}
                      alt="Store"
                      className="w-6 h-6 rounded-full mr-2"
                      loading="lazy"
                    />
                    <button onClick={()=>navi(`/sellerproducts/${product.createdBy._id}`)} className="text-sm text-gray-600">{product.createdBy?.storeName}</button>
                  </div>
                  <button className=" text-gray-900 group-hover:text-eshop-blue-600 transition-colors" onClick={()=> selectProduct(product._id)}>Shop Now</button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
    </>
  );
};
export default ProductsPage;
