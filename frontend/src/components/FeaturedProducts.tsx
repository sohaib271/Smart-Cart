import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star, ArrowRight } from "lucide-react";
import useAllProducts from "./compoAssis/products";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import useAddCart from "./compoAssis/cart";
import useUser from "./compoAssis/userInfo";
const FeaturedProducts = () => {
  const {addToCart}=useAddCart();
  const {data:products} =useAllProducts();
  const {data:user}=useUser();
const {selectProduct,navigateToPages}=useSelectedProduct();
const [activeCategory, setActiveCategory] = useState("All");
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [loaded, setLoaded] = useState(false);
  const categories = ["All", "Audio", "Wearable", "Computing", "Gadgets", "Sports", "Clothing","Skin Care"];
  useEffect(() => {
    if (activeCategory === "All") {
      setDisplayedProducts(products);
    } else {
      setDisplayedProducts(products?.filter(p => p?.category === activeCategory));
    }
  }, [activeCategory,products]);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
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
    <section id="featured" className={`py-20  px-6 md:px-12 bg-white`}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 ${loaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="bg-eshop-blue-50 text-eshop-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            DISCOVER
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of premium products, designed with attention to detail and built to last.
          </p>
        </div>
        <div className={`flex flex-wrap justify-center gap-2 mb-10 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          {categories.map(category => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-eshop-blue-600 text-white" 
                  : "bg-eshop-blue-50 text-eshop-blue-600 hover:bg-eshop-blue-100"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
        >
          {displayedProducts?.map(product => (
            <motion.div 
              key={product._id}
              className="glass-card group p-4  hover:shadow-lg"
              variants={itemVariants}
            >
              <div className="relative h-64 overflow-hidden rounded-xl mb-4">
                <img 
                  src={product.productImage} 
                  alt={`image of ${product.name}`} 
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
                      src={product.createdBy?.storeLogo || "/customer.webp"}
                     
                      alt={`Store Logo of ${product.createdBy?.storeName}`}
                      className="w-8 h-8 rounded-full mr-2"
                      loading="lazy"
                    />
                    <button onClick={()=>navigateToPages(`/sellerproducts/${product.createdBy._id}`)} className="text-sm text-gray-600">{product.createdBy?.storeName}</button>
                  </div>
                 {product.createdBy._id !== user?._id &&  <button className=" text-gray-900 group-hover:text-eshop-blue-600 transition-colors" onClick={()=> selectProduct(product._id)}>Shop Now</button>}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-16 text-center">
          <button onClick={()=> navigateToPages("/search")} className="premium-button inline-flex items-center gap-2 group">
            View All Products
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProducts;
