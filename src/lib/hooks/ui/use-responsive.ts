import { useState, useEffect, useCallback, useMemo } from "react";

export interface ExtendedBreakpoints {
  mobileS: number;
  mobileM: number;
  mobileL: number;
  tablet: number;
  tabletLg: number;
  laptop: number;
  laptopL: number;
  desktop: number;
  desktopL: number;
}

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'laptop' | 'desktop';
  size: 'small' | 'medium' | 'large' | 'xl';
  orientation: 'portrait' | 'landscape';
  isTouch: boolean;
  isRetina: boolean;
  aspectRatio: number;
  pixelDensity: number;
}

const DEFAULT_BREAKPOINTS: ExtendedBreakpoints = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  tabletLg: 1024,
  laptop: 1280,
  laptopL: 1440,
  desktop: 1920,
  desktopL: 2560,
};

export const useResponsive = (breakpoints: ExtendedBreakpoints = DEFAULT_BREAKPOINTS) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    size: 'medium',
    orientation: 'landscape',
    isTouch: false,
    isRetina: false,
    aspectRatio: 16/9,
    pixelDensity: 1,
  });

  // Enhanced device detection
  const detectDevice = useCallback((width: number, height: number): DeviceInfo => {
    const orientation = width > height ? 'landscape' : 'portrait';
    const aspectRatio = width / height;
    const pixelDensity = window.devicePixelRatio || 1;
    const isRetina = pixelDensity > 1;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let type: DeviceInfo['type'] = 'desktop';
    let size: DeviceInfo['size'] = 'medium';

    if (width < breakpoints.tablet) {
      type = 'mobile';
      if (width < breakpoints.mobileM) size = 'small';
      else if (width < breakpoints.mobileL) size = 'medium';
      else size = 'large';
    } else if (width < breakpoints.laptop) {
      type = 'tablet';
      if (width < breakpoints.tabletLg) size = 'small';
      else size = 'large';
    } else if (width < breakpoints.desktop) {
      type = 'laptop';
      if (width < breakpoints.laptopL) size = 'medium';
      else size = 'large';
    } else {
      type = 'desktop';
      if (width < breakpoints.desktopL) size = 'large';
      else size = 'xl';
    }

    return {
      type,
      size,
      orientation,
      isTouch,
      isRetina,
      aspectRatio,
      pixelDensity,
    };
  }, [breakpoints]);

  const updateResponsive = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setDimensions({ width, height });
    setDeviceInfo(detectDevice(width, height));
  }, [detectDevice]);

  useEffect(() => {
    updateResponsive();
    
    const handleResize = () => updateResponsive();
    const handleOrientationChange = () => {
      setTimeout(updateResponsive, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    
    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      mediaQuery.removeEventListener('change', handleOrientationChange);
    };
  }, [updateResponsive]);

  // Computed responsive states
  const responsive = useMemo(() => ({
    // Legacy compatibility
    isMobile: deviceInfo.type === 'mobile',
    isTablet: deviceInfo.type === 'tablet',
    isDesktop: deviceInfo.type === 'desktop' || deviceInfo.type === 'laptop',
    isLandscape: deviceInfo.orientation === 'landscape',
    
    // Extended states
    isMobileS: dimensions.width < breakpoints.mobileM,
    isMobileM: dimensions.width >= breakpoints.mobileM && dimensions.width < breakpoints.mobileL,
    isMobileL: dimensions.width >= breakpoints.mobileL && dimensions.width < breakpoints.tablet,
    isTabletSm: dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.tabletLg,
    isTabletLg: dimensions.width >= breakpoints.tabletLg && dimensions.width < breakpoints.laptop,
    isLaptop: dimensions.width >= breakpoints.laptop && dimensions.width < breakpoints.laptopL,
    isLaptopL: dimensions.width >= breakpoints.laptopL && dimensions.width < breakpoints.desktop,
    isDesktopSm: dimensions.width >= breakpoints.desktop && dimensions.width < breakpoints.desktopL,
    isDesktopL: dimensions.width >= breakpoints.desktopL,
    
    // Device characteristics
    isTouch: deviceInfo.isTouch,
    isRetina: deviceInfo.isRetina,
    isPortrait: deviceInfo.orientation === 'portrait',
    
    // Utility states
    isSmallScreen: dimensions.width < breakpoints.tablet,
    isMediumScreen: dimensions.width >= breakpoints.tablet && dimensions.width < breakpoints.laptop,
    isLargeScreen: dimensions.width >= breakpoints.laptop,
    isUltraWide: deviceInfo.aspectRatio > 2,
    isSquare: Math.abs(deviceInfo.aspectRatio - 1) < 0.1,
  }), [deviceInfo, dimensions, breakpoints]);

  // Enhanced responsive value getter
  const getResponsiveValue = useCallback(<T>(values: {
    mobileS?: T;
    mobileM?: T;
    mobileL?: T;
    tablet?: T;
    tabletLg?: T;
    laptop?: T;
    laptopL?: T;
    desktop?: T;
    desktopL?: T;
    fallback: T;
  }): T => {
    const { width } = dimensions;
    
    if (width >= breakpoints.desktopL && values.desktopL !== undefined) return values.desktopL;
    if (width >= breakpoints.desktop && values.desktop !== undefined) return values.desktop;
    if (width >= breakpoints.laptopL && values.laptopL !== undefined) return values.laptopL;
    if (width >= breakpoints.laptop && values.laptop !== undefined) return values.laptop;
    if (width >= breakpoints.tabletLg && values.tabletLg !== undefined) return values.tabletLg;
    if (width >= breakpoints.tablet && values.tablet !== undefined) return values.tablet;
    if (width >= breakpoints.mobileL && values.mobileL !== undefined) return values.mobileL;
    if (width >= breakpoints.mobileM && values.mobileM !== undefined) return values.mobileM;
    if (values.mobileS !== undefined) return values.mobileS;
    
    return values.fallback;
  }, [dimensions, breakpoints]);

  // Enhanced class name getter
  const getResponsiveClass = useCallback((classes: {
    mobileS?: string;
    mobileM?: string;
    mobileL?: string;
    tablet?: string;
    tabletLg?: string;
    laptop?: string;
    laptopL?: string;
    desktop?: string;
    desktopL?: string;
    fallback: string;
  }): string => {
    return getResponsiveValue(classes);
  }, [getResponsiveValue]);

  // Grid columns calculator
  const getGridColumns = useCallback((
    mobile = 1,
    tablet = 2,
    desktop = 3,
    wide = 4
  ): number => {
    if (responsive.isDesktopL) return wide;
    if (responsive.isLargeScreen) return desktop;
    if (responsive.isMediumScreen) return tablet;
    return mobile;
  }, [responsive]);

  return {
    // Dimensions
    width: dimensions.width,
    height: dimensions.height,
    
    // Device info
    deviceInfo,
    
    // All responsive states
    ...responsive,
    
    // Utility functions
    getResponsiveValue,
    getResponsiveClass,
    getGridColumns,
    
    // Breakpoints for reference
    breakpoints,
  };
}; 