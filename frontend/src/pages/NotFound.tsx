
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-eshop-blue-50 px-6 md:px-12">
      <div className="glass-card p-12 max-w-md w-full text-center animate-fade-up">
        <div className="text-9xl font-bold text-eshop-blue-600 opacity-20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="premium-button inline-flex items-center gap-2 group">
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
