import { useEffect } from "react";

const SimpleAnimations = () => {
  useEffect(() => {
    // Simple CSS-based animations initialization
    // This replaces the complex AOS and cursor animations temporarily
    
    // Add a simple fade-in class to elements with data-aos attributes
    const elementsWithAos = document.querySelectorAll('[data-aos]');
    elementsWithAos.forEach((el, index) => {
      // Stagger the animations
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  // Add global styles for simple animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.6s ease forwards;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default SimpleAnimations;