import  { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X, LifeBuoy, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Delay } from "./compoAssis/delay";
import { Link, useNavigate } from "react-router-dom";
import useUser from "./compoAssis/userInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useSelectedProduct } from "./compoAssis/selectedProduct";
import { useLoading } from "./loading/loading";
import useCart from "./compoAssis/getCart";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {startLoading,stopLoading}=useLoading();
  const {cartItems}=useCart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const {navigateToPages}=useSelectedProduct();
  const logout =async () => {
    startLoading();
   await Delay(2);
    localStorage.removeItem("token");
    queryClient.removeQueries(String["user"]);
    navigate("/");
    stopLoading();
  };
 
const userProfile=()=>{
  if(user.role === "Seller") navigateToPages(`/sellerprofile`);
  else navigateToPages(`/buyerprofile/${user?._id}`)
}
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12", scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent")}> 
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center space-x-2">
      <ShoppingCart 
  className="text-blue-700 w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10" 
/>
  <Link 
    to="/" 
    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-eshop-blue-700 tracking-tight flex items-center"
  >
    Smart Cart
  </Link>
</div>

        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Shop", user?.role === "ADMIN" ? "Admin" : "", "New Arrivals", "Featured", "About Us", (user?.role === "Buyer") || !user ? "Become a Seller" : "", !user ? "Log in" : ""].filter(Boolean).map((item,index) => (
            <Link key={index} to={`/${item.toLowerCase()}`} className="text-gray-700 hover:text-eshop-blue-600 font-medium text-sm tracking-wide transition-colors duration-200">
              {item}
            </Link>
          ))}
        </nav>
        {user && (
          <div className="relative dropdown">
            <button aria-label="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-gray-700 font-medium text-sm tracking-wide transition-colors duration-200">
              {user.role === "Seller" ? (
                <img src={user?.storeLogo} alt="Store Logo" loading="lazy" className="w-8 h-8 ms-2 rounded-full" />
              ) : (
                <span className="ms-2">{user?.name}</span>
              )}
              <ChevronDown size={16} className="text-gray-600" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden border z-50">
                <button onClick={userProfile} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-300">My Profile</button>
                <button onClick={logout} className="w-full  text-left px-4 py-2 text-gray-700 hover:bg-gray-300">Log Out</button>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center space-x-1">
          <button aria-label="searchbar" onClick={() => navigateToPages("/search")} className="p-2 rounded-full hover:bg-eshop-blue-50 transition-colors">
            <Search   size={20} className="text-gray-700 ms-2" />
          </button>
          <div
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}>
          </div>
          <button aria-label="Cart" disabled={!user && true} onClick={() => navigateToPages(`/cart/${user?._id}`)} className="p-2 rounded-full hover:bg-eshop-blue-50 transition-colors relative">
            <ShoppingCart size={20} className="text-gray-700" />
            {cartItems?.length > 0 && <span className="absolute -top-1 -right-1 bg-eshop-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartItems?.length}</span>}
          </button>
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <button aria-label="customer support" onClick={() => navigateToPages("/support")} className="p-2 rounded-full hover:bg-eshop-blue-50 transition-colors">
              <LifeBuoy size={20} className="text-gray-700" />
            </button>
            {tooltipVisible && (
              <span className="absolute top-10 bg-gray-800 text-white text-xs py-1 px-2 rounded-md">
                Customer Support
              </span>
            )}
          </div>
          <button
          aria-label="Mobile Menu"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            {["Home", "Shop", "New Arrivals", "Featured", "About Us", !user ? "Become a Seller" : "", !user ? "Log In" : ""].map(
              (item, i) => (
                <Link
                  key={i}
                  to={`/${item.toLowerCase()}`}
                  className="text-gray-800 font-medium text-lg border-b border-gray-100 pb-2"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
    </>
  );
};
export default Navbar;
