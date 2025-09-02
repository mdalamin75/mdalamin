import { useEffect } from "react";

const SimpleAnimations = () => {
  useEffect(() => {
    // Make initially present [data-aos] elements visible
    const reveal = (elements) => {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, index * 50);
      });
    };

    const initial = document.querySelectorAll('[data-aos]');
    if (initial.length) reveal(initial);

    // Observe for dynamically added nodes with [data-aos]
    const observer = new MutationObserver((mutations) => {
      const added = [];
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches && node.matches('[data-aos]')) added.push(node);
          // Also check descendants
          node.querySelectorAll && added.push(...node.querySelectorAll('[data-aos]'));
        });
      });
      if (added.length) reveal(added);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Add global styles for simple animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [data-aos] {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
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