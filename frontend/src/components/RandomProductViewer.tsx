import  { useState, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";
import useAllProducts from "./compoAssis/products";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
const RandomProductViewer = () => {
const {data:products, isLoading }=useAllProducts();
const {selectProduct,navigateToPages}=useSelectedProduct();  
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const getRandomProducts = () => {
    if (!Array.isArray(products) || products.length === 0) return [];
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 6);
  };
  useEffect(() => {
    if(!isLoading){
      setIsLoaded(true);
      setVisibleProducts(getRandomProducts());
    }   
    const interval = setInterval(() => {
      setVisibleProducts(getRandomProducts());
    }, 5000);
    return () => clearInterval(interval);
  }, [products,isLoading]);
  return (
    <section className="relative py-20 px-6 md:px-12 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-eshop-blue-50 to-white"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className={`text-center mb-12 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="bg-eshop-blue-50 text-eshop-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            EXPLORE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">
            Discover New Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our collection is constantly updated with trending products. Check back often to see what's new!
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {visibleProducts?.map((product, index) => (
            <div 
              key={`${product?._id}-${index}`} 
              className="relative rounded-2xl overflow-hidden group"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                height: index % 3 === 0 ? '300px' : '250px'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
              <img 
                src={product?.productImage} 
                alt={`image of ${product?.title}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-medium">{product?.title}</h3>
                <button onClick={()=>selectProduct(product?._id)} className="text-xs text-eshop-blue-100 mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View details
                  <ArrowDownRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={()=> navigateToPages("/search")} className="premium-button-outline">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};
export default RandomProductViewer;
