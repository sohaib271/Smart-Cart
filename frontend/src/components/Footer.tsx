import { ArrowRight, Instagram, Twitter, Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-eshop-blue-50 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 rounded-2xl mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-eshop-blue-600 text-sm font-medium">STAY UPDATED</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-3">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600">
                Get the latest updates, exclusive offers and more sent directly to your inbox.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-eshop-blue-500 focus:border-transparent"
                />
                <button className="premium-button whitespace-nowrap flex items-center justify-center gap-2 group">
                  Subscribe
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link to="/" className="text-xl font-bold text-eshop-blue-700 tracking-tight flex items-center mb-4">
              <span>Smart·Cart</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Discover premium quality products designed for modern living. Excellence in every detail.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="w-8 h-8 rounded-full bg-eshop-blue-100 flex items-center justify-center text-eshop-blue-600 hover:bg-eshop-blue-600 hover:text-white transition-colors">
                <Instagram size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 rounded-full bg-eshop-blue-100 flex items-center justify-center text-eshop-blue-600 hover:bg-eshop-blue-600 hover:text-white transition-colors">
                <Twitter size={16} />
              </Link>
              <Link to="#" className="w-8 h-8 rounded-full bg-eshop-blue-100 flex items-center justify-center text-eshop-blue-600 hover:bg-eshop-blue-600 hover:text-white transition-colors">
                <Facebook size={16} />
              </Link>
              <Link to="https://www.google.com" className="w-8 h-8 rounded-full bg-eshop-blue-100 flex items-center justify-center text-eshop-blue-600 hover:bg-eshop-blue-600 hover:text-white transition-colors">
              <Linkedin  size={16} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-2">
              {["All Products", "New Arrivals", "Featured",].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-gray-600 hover:text-eshop-blue-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us"].map(item => (
                <li key={item}>
                  <Link to="/about us" className="text-gray-600 hover:text-eshop-blue-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-eshop-blue-600 transition-colors flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Wapda Town, Gujranwala, Pakistan</span>
                </Link>
              </li>
              <li>
                <Link to="tel:+1234567890" className="text-gray-600 hover:text-eshop-blue-600 transition-colors flex items-center gap-2">
                  <Phone size={16} className="flex-shrink-0" />
                  <span>+92 3060624288</span>
                </Link>
              </li>
              <li>
                <Link to="mailto:info@eshop.com" className="text-gray-600 hover:text-eshop-blue-600 transition-colors flex items-center gap-2">
                  <Mail size={16} className="flex-shrink-0" />
                  <span>sohaibsheikh6199@gmail.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Smart·Cart. All rights reserved.
          </p>
          <div className="flex flex-wrap space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-gray-500 hover:text-eshop-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-eshop-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-eshop-blue-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
