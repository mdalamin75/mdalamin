// layouts/AdminLayout.js
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const AdminHeader = dynamic(() => import("../components/Admin/AdminHeader"), {
  ssr: false,
})

const CursorAnimation = dynamic(() => import("../components/CursorAnimation"), {
  ssr: false,
});

const AdminLayout = ({ children }) => {
  const cleanupIntervalRef = useRef(null);
  const markdownStyleRef = useRef(null);

  // Completely remove Tawk in admin pages
  useEffect(() => {
    // Function to remove TawkMessenger
    const removeTawk = () => {
      // Remove any existing Tawk instances
      const tawkElements = document.querySelectorAll('[id^="tawk"], [class^="tawk"], iframe[src*="tawk.to"]');
      tawkElements.forEach(el => el.remove());
      
      // Disable the global Tawk_API if it exists
      if (window.Tawk_API) {
        try {
          window.Tawk_API.hideWidget();
          window.Tawk_API.onLoaded = null;
        } catch (e) {
          console.log('Error hiding Tawk widget');
        }
        
        window.Tawk_API = {
          hideWidget: () => {},
          showWidget: () => {},
          toggle: () => {},
          onLoaded: () => {},
          onBeforeLoad: () => {},
          onChatMaximized: () => {},
          onChatMinimized: () => {},
          onChatHidden: () => {},
          onChatStarted: () => {},
          onChatEnded: () => {},
          onPrechatSubmit: () => {},
          onOfflineSubmit: () => {},
          addEvent: () => {},
          addTags: () => {},
          removeTags: () => {},
        };
      }
      
      // Nullify Tawk_LoadStart to prevent reload
      if (window.Tawk_LoadStart) {
        window.Tawk_LoadStart = null;
      }
      
      // Override potential script re-injection
      const oldAppendChild = document.head.appendChild;
      document.head.appendChild = function(element) {
        if (element.tagName === 'SCRIPT' && element.src && element.src.includes('tawk.to')) {
          return element; // Do not append
        }
        return oldAppendChild.call(this, element);
      };
    };
    
    // Run cleanup immediately
    removeTawk();
    
    // Set up a MutationObserver to catch dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          const tawkNode = Array.from(mutation.addedNodes).find(
            node => node.id && node.id.startsWith('tawk') || 
                   (node.className && typeof node.className === 'string' && node.className.includes('tawk'))
          );
          
          if (tawkNode) {
            removeTawk();
          }
        }
      });
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Also set a periodic cleanup as a fallback
    cleanupIntervalRef.current = setInterval(removeTawk, 1000);
    
    // Cleanup on unmount
    return () => {
      observer.disconnect();
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, []);

  // Styling for RC Markdown editor
  useEffect(() => {
    // DaisyUI night theme colors for dark mode
    const darkBackground = '#0F172A';
    const darkBackground2 = '#0F172A';
    const darkBorder = '#CCCCCC';
    const darkText = '#F2F2F2';
    
    // DaisyUI light theme colors for light mode
    const lightBackground = '#FFFFFF';
    const lightBackground2 = '#F2F2F2';
    const lightBorder = '#DDDDDD';
    const lightText = '#333333';
    
    // Function to add editor styles
    const addMarkdownStyles = () => {
      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'night';
      
      // Select colors based on current theme
      const bgColor = isDarkTheme ? darkBackground : lightBackground;
      const bgColor2 = isDarkTheme ? darkBackground2 : lightBackground2;
      const borderColor = isDarkTheme ? darkBorder : lightBorder;
      const textColor = isDarkTheme ? darkText : lightText;
      
      // Find all markdown editors
      const editors = document.querySelectorAll('.rc-md-editor');
      
      if (editors.length > 0) {
        editors.forEach(editor => {
          // Navigation bar
          const navBar = editor.querySelector('.rc-md-navigation');
          if (navBar) {
            navBar.style.backgroundColor = bgColor2;
            navBar.style.color = textColor;
            navBar.style.borderBottomColor = borderColor;
          }
          
          // Editor container and its children
          const containers = editor.querySelectorAll('.editor-container, .input, .html-wrap, textarea, pre, code');
          containers.forEach(container => {
            container.style.backgroundColor = bgColor;
            container.style.color = textColor;
            if (container.style.setProperty) {
              container.style.setProperty('background-color', bgColor, 'important');
              container.style.setProperty('color', textColor, 'important');
            }
          });
          
          // All elements with borders
          const borderedElements = editor.querySelectorAll('*');
          borderedElements.forEach(el => {
            if (el.style.setProperty) {
              el.style.setProperty('border-color', borderColor, 'important');
            }
          });
          
          // SVG icons
          const svgElements = editor.querySelectorAll('svg, path');
          svgElements.forEach(svg => {
            if (svg.style.setProperty) {
              svg.style.setProperty('fill', textColor, 'important');
              svg.style.setProperty('color', textColor, 'important');
            }
          });
        });
      }
    };
    
    // First attempt
    addMarkdownStyles();
    
    // Watch for theme changes
    const themeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-theme') {
          addMarkdownStyles();
        }
      });
    });
    
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    
    // Watch for dynamic addition of editors
    const domObserver = new MutationObserver(mutations => {
      let shouldUpdate = false;
      
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          Array.from(mutation.addedNodes).forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.classList?.contains('rc-md-editor') || 
                  node.querySelector?.('.rc-md-editor')) {
                shouldUpdate = true;
              }
            }
          });
        }
      });
      
      if (shouldUpdate) {
        addMarkdownStyles();
      }
    });
    
    domObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Check periodically
    const intervalId = setInterval(addMarkdownStyles, 1000);
    
    // Global stylesheet with !important rules as backup
    const styleEl = document.createElement('style');
    styleEl.id = 'markdown-editor-styles';
    styleEl.textContent = `
      /* Base styles for markdown editor that apply always */
      .rc-md-editor .rc-md-navigation,
      .rc-md-editor .tool-bar {
        background-color: ${lightBackground2} !important;
        color: ${lightText} !important;
        border-color: ${lightBorder} !important;
      }
      
      .rc-md-editor .editor-container,
      .rc-md-editor .editor-container .sec-md .input,
      .rc-md-editor .editor-container .sec-html .html-wrap,
      .rc-md-editor textarea,
      .rc-md-editor pre,
      .rc-md-editor code {
        background-color: ${lightBackground} !important;
        color: ${lightText} !important;
      }
      
      /* Dark theme overrides */
      html[data-theme='night'] .rc-md-editor .rc-md-navigation,
      html[data-theme='night'] .rc-md-editor .tool-bar {
        background-color: ${darkBackground2} !important;
        color: ${darkText} !important;
        border-color: ${darkBorder} !important;
      }
      
      html[data-theme='night'] .rc-md-editor .editor-container,
      html[data-theme='night'] .rc-md-editor .editor-container .sec-md .input,
      html[data-theme='night'] .rc-md-editor .editor-container .sec-html .html-wrap,
      html[data-theme='night'] .rc-md-editor textarea,
      html[data-theme='night'] .rc-md-editor pre,
      html[data-theme='night'] .rc-md-editor code,
      html[data-theme='night'] .rc-md-editor .custom-html-style {
        background-color: ${darkBackground} !important;
        color: ${darkText} !important;
      }
    `;
    document.head.appendChild(styleEl);
    markdownStyleRef.current = styleEl;
    
    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      themeObserver.disconnect();
      domObserver.disconnect();
      if (markdownStyleRef.current) {
        markdownStyleRef.current.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 pt-16 z-0 relative admin-layout-main">
        <main className="p-4">{children}</main>
      </div>
      <CursorAnimation />
      
      {/* Hide TawkMessenger in admin pages */}
      <style jsx global>{`
        /* Hide all Tawk elements */
        .tawk-min-container,
        #tawk-tooltip,
        .tawk-button,
        iframe[src*="tawk.to"],
        div[style*="tawk.to"],
        div[id^="tawk"],
        div[class^="tawk"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          z-index: -9999 !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
