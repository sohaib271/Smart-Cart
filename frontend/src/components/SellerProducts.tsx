import React from 'react';
import { motion } from 'framer-motion';
import {  Tag } from 'lucide-react';
import useUser from './compoAssis/userInfo';
import useAllProducts from './compoAssis/products';
import { useParams } from 'react-router-dom';
import { useSelectedProduct } from './compoAssis/selectedProduct';
import Spinner from './Spinner';
import { useLoading } from './loading/loading';
import NoProductOrder from './compoAssis/NoProductOrder';


interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  productImage: string;
  createdBy:string;
  name:string; 
}
const SellerProductsPage: React.FC = () => {
   const {selectProduct}=useSelectedProduct();
   const {isLoading}=useLoading();
  const { sellerId } = useParams();
 const {data:all}=useAllProducts();

const {data:user}=useUser();
 const products=all?.filter(p => p.createdBy?._id===(sellerId || user?._id));
 const store = {
  name: sellerId?products?.[0].createdBy?.storeName:"You",
  profilePic:products?.[0]?.createdBy?.storeLogo || user?.storeLogo,
};
  const groupedProducts: Record<string, Product[]> = products?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
  return (
    <>
    <div className={` bg-white p-8 ${isLoading && "fixed inset-0"} } `}>
    {isLoading && (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
      <Spinner />
    </div>
  )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4 mb-8"
      >
        <img
          src={store.profilePic}
          alt="Store Profile"
          className="w-16 h-16 rounded-full border-2 border-blue-600"
          loading='lazy'
        />
        <div>
          <h1 className="text-2xl font-bold text-blue-900">{store?.name}</h1>
        </div>
        {/* {products ?} */}
      </motion.div>
      {groupedProducts && Object.keys(groupedProducts).length > 0 ? Object.entries(groupedProducts).map(([category, items]) => (
        <div  className="mb-8" key={category}>
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <Tag className="mr-2" size={20} />
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={product.productImage}
                  alt={`product image of ${product.title}`}
                  className="w-full h-48 object-cover"
                  loading='lazy'
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Rs {product.price}</p>
                  <div className="flex items-center mt-2">
                    <img
                      src={store.profilePic}
                      alt="Store"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <p className="text-sm text-gray-600">{store.name}</p>
                  </div>
                </div>
                {sellerId !==user?._id && <button disabled={isLoading} className='text-gray-900 ms-3 mb-3 hover:text-blue-600 transition-colors' onClick={()=>selectProduct(product._id)}>Shop Now</button>}
              </motion.div>
            ))}
          </div>
        </div>
      )): 
       <NoProductOrder message='Your Product Page is Empty!' subMessage='Start selling by adding your first product.' buttonText=' Add Product' buttonLink='/sell'/>}
    </div>
    </>
  );
};
export default SellerProductsPage;