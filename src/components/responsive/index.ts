// Main responsive components
export { ResponsiveGrid, AutoGrid, MasonryGrid } from "./responsive-grid";
export { ResponsiveContainer, MobileContainer, ContentContainer, WideContainer } from "./responsive-container";
export { ResponsiveImage, ResponsiveAvatar, ResponsiveHeroImage } from "./responsive-image";

// Responsive hooks
export { useResponsive } from "@/lib/hooks/ui/use-responsive";
export { useLazyLoad, useResponsiveLazyImage, useComponentLazyLoad, useViewportPreload } from "@/lib/hooks/ui/use-lazy-load";

// Type exports
export type { ExtendedBreakpoints, DeviceInfo } from "@/lib/hooks/ui/use-responsive";