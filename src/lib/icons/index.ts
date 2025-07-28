import dynamic from "next/dynamic";

// Lazy load icons only when needed
export const Icons = {
  // Navigation
  ArrowRight: dynamic(() => import("lucide-react").then(m => ({ default: m.ArrowRight }))),
  ArrowLeft: dynamic(() => import("lucide-react").then(m => ({ default: m.ArrowLeft }))),
  ChevronDown: dynamic(() => import("lucide-react").then(m => ({ default: m.ChevronDown }))),
  
  // Trinity Icons
  Shield: dynamic(() => import("lucide-react").then(m => ({ default: m.Shield }))),
  BrainCircuit: dynamic(() => import("lucide-react").then(m => ({ default: m.BrainCircuit }))),
  Palette: dynamic(() => import("lucide-react").then(m => ({ default: m.Palette }))),
  
  // Tech Icons
  Code: dynamic(() => import("lucide-react").then(m => ({ default: m.Code }))),
  Server: dynamic(() => import("lucide-react").then(m => ({ default: m.Server }))),
  Cloud: dynamic(() => import("lucide-react").then(m => ({ default: m.Cloud }))),
  
  // Social Icons
  Github: dynamic(() => import("lucide-react").then(m => ({ default: m.Github }))),
  Linkedin: dynamic(() => import("lucide-react").then(m => ({ default: m.Linkedin }))),
  Twitter: dynamic(() => import("lucide-react").then(m => ({ default: m.Twitter }))),
  Youtube: dynamic(() => import("lucide-react").then(m => ({ default: m.Youtube }))),
  Twitch: dynamic(() => import("lucide-react").then(m => ({ default: m.Twitch }))),
  
  // UI Icons
  Mail: dynamic(() => import("lucide-react").then(m => ({ default: m.Mail }))),
  Home: dynamic(() => import("lucide-react").then(m => ({ default: m.Home }))),
  Music: dynamic(() => import("lucide-react").then(m => ({ default: m.Music }))),
  Camera: dynamic(() => import("lucide-react").then(m => ({ default: m.Camera }))),
  Lock: dynamic(() => import("lucide-react").then(m => ({ default: m.Lock }))),
  BarChart: dynamic(() => import("lucide-react").then(m => ({ default: m.BarChart }))),
  
  // Custom Icons (from your existing icons.tsx)
  SoundCloudIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.SoundCloudIcon }))),
  DiscordIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.DiscordIcon }))),
  RedditIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.RedditIcon }))),
  ReactIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.ReactIcon }))),
  NextjsIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.NextjsIcon }))),
  NodejsIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.NodejsIcon }))),
  TailwindIcon: dynamic(() => import("@/components/icons").then(m => ({ default: m.TailwindIcon }))),
  DreamcoderLogo: dynamic(() => import("@/components/icons").then(m => ({ default: m.DreamcoderLogo }))),
} as const;

// Hook for optimized icon usage
export const useIcon = (iconName: keyof typeof Icons) => {
  return Icons[iconName];
};

// Type for icon names
export type IconName = keyof typeof Icons; 