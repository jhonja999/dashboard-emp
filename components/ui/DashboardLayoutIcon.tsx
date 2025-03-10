import React, { useState } from 'react';

const DashboardLayoutIcon = () => {
  const [hoverState, setHoverState] = useState(0);
  
  // Cambiar entre los tres estados en secuencia al hacer hover
  const handleMouseEnter = () => {
    const newState = (hoverState + 1) % 3;
    setHoverState(newState);
  };

  return (
    <div 
      className="cursor-pointer p-2 transition-colors rounded-lg"
      onMouseEnter={handleMouseEnter}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        {/* Layout Dashboard (estado 0) */}
        {hoverState === 0 && (
          <>
            <rect 
              className="animate-fade-in" 
              width="7" height="9" x="3" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-100" 
              width="7" height="5" x="14" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-200" 
              width="7" height="9" x="14" y="12" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-300" 
              width="7" height="5" x="3" y="16" rx="1"
            />
          </>
        )}

        {/* Layout Grid (estado 1) */}
        {hoverState === 1 && (
          <>
            <rect 
              className="animate-fade-in" 
              width="7" height="7" x="3" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-100" 
              width="7" height="7" x="14" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-200" 
              width="7" height="7" x="14" y="14" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-300" 
              width="7" height="7" x="3" y="14" rx="1"
            />
          </>
        )}

        {/* Layout Panel Left (estado 2) */}
        {hoverState === 2 && (
          <>
            <rect 
              className="animate-fade-in" 
              width="7" height="18" x="3" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-100" 
              width="7" height="7" x="14" y="3" rx="1"
            />
            <rect 
              className="animate-fade-in animation-delay-200" 
              width="7" height="7" x="14" y="14" rx="1"
            />
          </>
        )}

        {/* Estilos CSS inline para las animaciones */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
          
          .animation-delay-100 {
            animation-delay: 0.1s;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
      </svg>
    </div>
  );
};

export default DashboardLayoutIcon;