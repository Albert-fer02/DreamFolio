import { useState, useEffect, useCallback } from "react";

interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

export const useResponsive = (breakpoints: Breakpoints = DEFAULT_BREAKPOINTS) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateResponsive = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    setWidth(w);
    setHeight(h);
    setIsMobile(w < breakpoints.mobile);
    setIsTablet(w >= breakpoints.mobile && w < breakpoints.tablet);
    setIsDesktop(w >= breakpoints.tablet);
    setIsLandscape(w > h);
  }, [breakpoints]);

  useEffect(() => {
    updateResponsive();
    
    const handleResize = () => updateResponsive();
    const handleOrientationChange = () => updateResponsive();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [updateResponsive]);

  const getResponsiveValue = useCallback(<T>(
    mobile: T,
    tablet: T,
    desktop: T
  ): T => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  }, [isMobile, isTablet, isDesktop]);

  const getResponsiveClass = useCallback((
    mobileClass: string,
    tabletClass: string,
    desktopClass: string
  ): string => {
    return getResponsiveValue(mobileClass, tabletClass, desktopClass);
  }, [getResponsiveValue]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    width,
    height,
    getResponsiveValue,
    getResponsiveClass,
  };
}; 