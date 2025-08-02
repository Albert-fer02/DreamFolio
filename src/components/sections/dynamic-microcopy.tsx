"use client";

import * as React from "react";

export function DynamicMicrocopy() {
  const [currentMicrocopy, setCurrentMicrocopy] = React.useState(0);
  
  const microcopies = [
    "💡 Every vulnerability fixed is a future attack prevented",
    "🚀 Code that scales, minds that innovate",
    "🎵 Where algorithms meet artistry",
    "🔐 Building tomorrow's secure foundations today",
    "💰 FinTech solutions that move at the speed of trust",
    "🌟 Turning complex problems into elegant solutions"
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMicrocopy((prev) => (prev + 1) % microcopies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs">
      <div className="text-white p-3 rounded-lg shadow-lg backdrop-blur-sm animate-in slide-in-from-bottom-2"
           style={{
             background: 'linear-gradient(135deg, #2d63a1 0%, #e5e7eb7b 100%)'
           }}>
        <p className="text-sm font-medium">
          {microcopies[currentMicrocopy]}
        </p>
      </div>
    </div>
  );
} 