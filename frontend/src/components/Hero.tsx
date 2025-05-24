import  { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import useAllProducts from "./compoAssis/products";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
 const {data:products}=useAllProducts();
 const {navigateToPages}=useSelectedProduct();
 const product=products?.[4];
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <section className="relative min-h-screen pt-20 hero-gradient overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-full h-full">
        <div className="absolute top-20 right-0 w-3/4 h-3/4 bg-eshop-blue-100 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-20 left-0 w-2/3 h-1/2 bg-eshop-blue-50 rounded-full filter blur-3xl opacity-30"></div>
      </div> 
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${loaded ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-block animate-fade-in">
              <span className="bg-eshop-blue-100 text-eshop-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                NEW COLLECTION 2025
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight text-balance">
              <span className="block">Discover Premium</span>
              <span className="block text-eshop-blue-600">Quality Products</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md text-balance">
              Explore our curated collection of high-quality products designed for modern living. Premium materials, thoughtful design.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={()=> navigateToPages("/search")} className="premium-button flex bg-blue-600 items-center gap-2 group">
                Shop Now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button onClick={()=>navigateToPages("/featured")} className="premium-button-outline">
                Explore Featured
              </button>
            </div>
            <div className="pt-4 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-eshop-blue-100 border-2 border-white flex items-center justify-center text-xs font-medium text-eshop-blue-600">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">2,340+</span> people shopping today
              </div>
            </div>
          </div>
          <div className={`relative ${loaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-eshop-blue-500 to-eshop-blue-400 rounded-3xl opacity-90 rotate-3 scale-95 animate-float"></div>
              <div className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={product?.productImage} 
                  alt={`image of ${product?.title}`} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 transform rotate-12 bg-white p-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-eshop-blue-50 rounded-lg px-4 py-2">
                  <div className="text-eshop-blue-700 font-semibold">{product?.title}</div>
                  <div className="text-eshop-blue-600 text-xs">High-Quality stuff</div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white p-3 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.7s' }}>
                <div className="text-sm font-semibold text-eshop-blue-700 flex items-center gap-1">
                  <span className="text-xs bg-eshop-blue-100 px-2 py-1 rounded-full">NEW</span>
                  <span>Rs {product?.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="animate-bounce">
          <div className="w-10 h-10 rounded-full border-2 border-eshop-blue-300 flex items-center justify-center">
            <ArrowRight size={16} className="text-eshop-blue-500 rotate-90" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
