"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Matrix Rain Effect
export const MatrixRain = () => {
  const [drops, setDrops] = React.useState<Array<{ x: number; speed: number; length: number }>>([]);

  React.useEffect(() => {
    const newDrops = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      speed: 1 + Math.random() * 2,
      length: 10 + Math.random() * 20,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      {drops.map((drop, index) => (
        <motion.div
          key={index}
          className="absolute text-primary text-xs font-code"
          style={{
            left: `${drop.x}%`,
            fontSize: `${8 + Math.random() * 4}px`,
          }}
          animate={{
            y: [0, window.innerHeight],
          }}
          transition={{
            duration: drop.speed * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array.from({ length: drop.length }, (_, i) => (
            <div
              key={i}
              className="opacity-80"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// Cyber Scan Line
export const CyberScanLine = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10"
      animate={{
        background: [
          "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
          "linear-gradient(to bottom, transparent 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)",
          "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Floating Particles
export const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    color: ["primary", "secondary", "accent"][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color} opacity-30`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Glitch Effect
export const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, -2, 2, 0],
          opacity: [1, 0.8, 0.9, 1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          filter: "blur(0.5px)",
          color: "rgba(0, 255, 255, 0.8)",
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [1, 0.8, 0.9, 1],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.05,
        }}
        style={{
          filter: "blur(0.5px)",
          color: "rgba(147, 51, 234, 0.8)",
        }}
      >
        {children}
      </motion.div>
      <div className="relative">{children}</div>
    </div>
  );
};

// Holographic Effect
export const HolographicEffect = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
            "linear-gradient(45deg, transparent 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)",
            "linear-gradient(45deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

// Data Stream Effect
export const DataStream = () => {
  const streams = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: (i * 20) + 10,
    speed: 1 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-0 w-px bg-gradient-to-b from-primary via-secondary to-accent"
          style={{
            left: `${stream.x}%`,
            height: "100vh",
          }}
          animate={{
            y: [-100, 100],
          }}
          transition={{
            duration: stream.speed * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Pulse Ring Effect
export const PulseRing = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 border border-primary rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 border border-secondary rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute inset-0 border border-accent rounded-full"
        animate={{
          scale: [1, 1.7, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
};

// Loading Spinner with Cyberpunk Style
export const CyberpunkSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <motion.div
        className="absolute inset-0 border-2 border-primary/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-1 border-2 border-secondary/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-1 border-2 border-transparent border-t-secondary rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

// Typing Cursor Effect
export const TypingCursor = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`w-0.5 h-6 bg-primary ${className}`}
      animate={{
        opacity: [1, 0, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Background Grid Pattern
export const BackgroundGrid = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
};

// Circuit Pattern
export const CircuitPattern = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 2px, transparent 2px)
        `,
        backgroundSize: "100px 100px",
      }}
    />
  );
}; 