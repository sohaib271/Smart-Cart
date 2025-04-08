import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import useAllProducts from "./compoAssis/products";
import { useSelectedProduct } from "./compoAssis/selectedProduct";

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: products } = useAllProducts();
  const {selectProduct}=useSelectedProduct();
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (products?.length) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [products]);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products?.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products?.length) % products?.length);
  };

  const getFeaturesArray = (featuresString) => {
    if (!featuresString) return [];
    return featuresString.split(',').map(feature => feature.trim());
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-eshop-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-12 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
          <span className="bg-eshop-blue-50 text-eshop-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            SPOTLIGHT
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900">
            Featured Product
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully selected products that represent the pinnacle of design and functionality.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex overflow-x-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {products?.map((product) => (
                <div key={product._id} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1 space-y-6 px-0 md:px-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-gray-600">
                        {product.description}
                      </p>
                      {product.features && (
                        <div className="grid grid-cols-2 gap-3">
                          {getFeaturesArray(product.features).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-eshop-blue-500"></div>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="pt-4">
                        <button onClick={()=> selectProduct(product._id)} className="premium-button inline-flex items-center gap-2 group">
                          View Details
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                    <div className="order-1 md:order-2 relative">
                      <div className="aspect-square relative mx-auto max-w-md">
                        <div className="absolute inset-0 bg-eshop-blue-100 rounded-full opacity-60 filter blur-xl animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img 
                            src={product.productImage} 
                            alt={product.title} 
                            className="max-h-full object-contain transform transition-all duration-700 hover:scale-105 z-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/2 left-0 -translate-y-1/2 flex justify-between w-full px-4">
            <button 
              onClick={prevProduct}
              className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors duration-300"
            >
              <ArrowLeft size={18} className="text-eshop-blue-600" />
            </button>
            <button 
              onClick={nextProduct}
              className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center hover:bg-white transition-colors duration-300"
            >
              <ArrowRight size={18} className="text-eshop-blue-600" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
            {products?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-eshop-blue-600 w-6" : "bg-eshop-blue-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;