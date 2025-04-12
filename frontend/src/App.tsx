import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SellerAccount from "./components/SellerAccount";
import SellerSignup from "./components/SellerForm";
import Login from "./components/LogIn";
import BuyerSignUp from "./components/BuyerSignUp";
import BuyerOrders from "./components/BuyerDash";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/Cart";
import ProductForm from "./components/ProductForm";
import SellerProductsPage from "./components/SellerProducts";
import SellerOrdersPage from "./components/SellerOrders";
import OrderDetailPage from "./components/OrderDetails";
import AdminUsers from "./components/AdminUserManagement";
import ProductsPage from "./components/SearchBar";
import { LoadingProvider } from "./components/loading/loading";
import FeaturedProducts from "./components/FeaturedProducts";
import SupportChat from "./components/customer";
import AboutUs from "./components/Aboutus";
import PrivacyPolicy from "./components/PrivacyPolicy";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/featured" element={<FeaturedProducts/>}/>
            <Route path="/support" element={<SupportChat/>}/>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/sellerprofile" element={<SellerAccount/>}/>
            <Route path="/become a seller" element={<SellerSignup/>}/>
            <Route path="/log in" element={<Login/>} />
            <Route path="/signup" element={<BuyerSignUp/>} />
            <Route path="/buyerprofile/:buyerId?" element={<BuyerOrders/>}/>
            <Route path="/productdetails/:productId?" element={<ProductDetails/>}/>
            <Route path="/cart/:userId" element={<CartPage/>}/>
            <Route path="/sell" element={<ProductForm/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="/myproducts" element={<SellerProductsPage/>}/>
            <Route path="/sellerorder" element={<SellerOrdersPage/>}/>
            <Route path="/orderD/:orderId?" element={<OrderDetailPage/>}/>
            <Route path="/admin" element={<AdminUsers/>}/>
            <Route path="/sellerproducts/:sellerId?" element={<SellerProductsPage/>}/>
            <Route path="/search" element={<ProductsPage/>}/>
            <Route path="/about us" element={<AboutUs/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default App;
