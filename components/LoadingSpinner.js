import React from 'react';

/**
 * A modern loading spinner component with multiple variants
 * 
 * @param {Object} props - Component properties
 * @param {string} props.variant - Spinner style variant ('ring', 'dots', 'pulse', 'bars')
 * @param {string} props.size - Size of the spinner ('sm', 'md', 'lg', 'xl')
 * @param {string} props.color - Primary color for the spinner
 * @param {string} props.text - Optional text to display below the spinner
 * @param {boolean} props.fullContainer - Whether to take full height of container and center
 */
const LoadingSpinner = ({ 
  variant = 'ring',
  size = 'md',
  color = '#0b1121',
  text = '',
  fullContainer = true
}) => {
  // Size mappings
  const sizeMap = {
    sm: { spinner: '24px', container: '80px', fontSize: '0.75rem' },
    md: { spinner: '36px', container: '120px', fontSize: '0.875rem' },
    lg: { spinner: '48px', container: '160px', fontSize: '1rem' },
    xl: { spinner: '64px', container: '200px', fontSize: '1.25rem' }
  };
  
  const selectedSize = sizeMap[size] || sizeMap.md;
  
  // Base container styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    width: '100%',
    height: fullContainer ? '100%' : 'auto',
    minHeight: fullContainer ? selectedSize.container : 'auto',
  };
  
  // Text style
  const textStyle = {
    marginTop: '0.75rem',
    fontSize: selectedSize.fontSize,
    fontWeight: '500',
    color: 'inherit',
    textAlign: 'center'
  };
  
  // Render the selected spinner variant
  const renderSpinner = () => {
    const spinnerSize = selectedSize.spinner;
    
    switch(variant) {
      case 'dots':
        return (
          <div className="dots-spinner" style={{ height: spinnerSize }}>
            <div style={{ backgroundColor: color }}></div>
            <div style={{ backgroundColor: color }}></div>
            <div style={{ backgroundColor: color }}></div>
          </div>
        );
        
      case 'pulse':
        return (
          <div 
            className="pulse-spinner" 
            style={{ 
              width: spinnerSize, 
              height: spinnerSize, 
              borderColor: color 
            }}
          ></div>
        );
        
      case 'bars':
        return (
          <div className="bars-spinner" style={{ height: spinnerSize }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ backgroundColor: color }}></div>
            ))}
          </div>
        );
        
      case 'ring':
      default:
        return (
          <div 
            className="ring-spinner" 
            style={{ 
              width: spinnerSize, 
              height: spinnerSize, 
              borderColor: `${color}40`,
              borderTopColor: color
            }}
          ></div>
        );
    }
  };
  
  return (
    <div style={containerStyle}>
      {renderSpinner()}
      {text && <div style={textStyle}>{text}</div>}
      
      <style jsx>{`
        /* Ring Spinner */
        .ring-spinner {
          border-radius: 50%;
          border-width: 3px;
          border-style: solid;
          animation: spin 1s linear infinite;
        }
        
        /* Dots Spinner */
        .dots-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .dots-spinner div {
          width: 25%;
          height: 25%;
          margin: 0 5%;
          border-radius: 50%;
          animation: dots 1.4s ease-in-out infinite;
        }
        
        .dots-spinner div:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .dots-spinner div:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        /* Pulse Spinner */
        .pulse-spinner {
          border-radius: 50%;
          border-width: 3px;
          border-style: solid;
          animation: pulse 1.2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        
        /* Bars Spinner */
        .bars-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .bars-spinner div {
          width: 12%;
          height: 100%;
          margin: 0 2%;
          border-radius: 8px;
          animation: bars 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        }
        
        .bars-spinner div:nth-child(1) {
          animation-delay: -0.48s;
        }
        
        .bars-spinner div:nth-child(2) {
          animation-delay: -0.36s;
        }
        
        .bars-spinner div:nth-child(3) {
          animation-delay: -0.24s;
        }
        
        .bars-spinner div:nth-child(4) {
          animation-delay: -0.12s;
        }
        
        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes dots {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(0.8); opacity: 1; }
        }
        
        @keyframes bars {
          0% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
          40%, 100% { transform: scaleY(0.4); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner; 