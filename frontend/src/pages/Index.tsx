
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductShowcase from "@/components/ProductShowcase";
import RandomProductViewer from "@/components/RandomProductViewer";
import Footer from "@/components/Footer";
import {  useLoading } from "@/components/loading/loading";
import SpinnerContainer from "@/components/SpinnerContainer";

// We need to include framer-motion for animations
 <lov-add-dependency>framer-motion@latest</lov-add-dependency> 

const Index = () => {
  // Smooth scroll to section when clicking on navigation links
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = target.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId || "");
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed header
            behavior: "smooth"
          });
        }
      }
    };
    
    document.addEventListener("click", handleSmoothScroll);
    
    return () => {
      document.removeEventListener("click", handleSmoothScroll);
    };
  }, []);
  const {isLoading}=useLoading();
  return (
    <div className={`min-h-screen bg-white ${isLoading && "fixed"}`}>
     <SpinnerContainer/>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <ProductShowcase/>
        <RandomProductViewer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
