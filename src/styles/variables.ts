import { useEffect, useState } from 'react';

// export const TABLET_WIDTH = 768;
// export const SMALL_DESKTOP_WIDTH = 1024;
// export const LARGE_DESKTOP_WIDTH = 1440;

// export const mediaQuerySm = `@media screen and (min-width: ${TABLET_WIDTH}px)`;
// export const mediaQueryMd = `@media screen and (min-width: ${SMALL_DESKTOP_WIDTH}px)`;
// export const mediaQueryLg = `@media screen and (min-width: ${LARGE_DESKTOP_WIDTH}px)`;

// export const colors = {
//   HEADER_GRADIENT_01: '#11978d',
//   HEADER_GRADIENT_02: '#10c253',
//   HEADER_GRADIENT_03: '#000',
//   HERO_MARK_GRADIENT_01: '#11978e99',
//   HERO_MARK_GRADIENT_02: '#71f4a199',
//   HERO_MARK_GRADIENT_03: '#f1fef699'
// };

// export const headerGradient = `linear-gradient(90deg, ${colors.HEADER_GRADIENT_01}, ${colors.HEADER_GRADIENT_02}, ${colors.HEADER_GRADIENT_03})`;

// export const heroMarkGradient = `linear-gradient(
//   90deg,
//   ${colors.HERO_MARK_GRADIENT_01} 0%,
//   ${colors.HERO_MARK_GRADIENT_02} 57.43%,
//   ${colors.HERO_MARK_GRADIENT_03} 85.47%
// )`;

export const DESKTOP_WIDTH = 1440;
export const MINI_DESKTOP_WIDTH = 1280;
export const TABLET_WIDTH = 1024;
export const SMALL_TABLET_WIDTH = 800;
export const MOBILE_WIDTH = 600;
export const MINI_MOBILE_WIDTH = 320;
export const isClient = typeof window === 'object';

export const mediaQueryDesktop = `@media only screen and (max-width: ${DESKTOP_WIDTH}px)`;
export const mediaQueryMiniDesktop = `@media only screen and (max-width: ${MINI_DESKTOP_WIDTH}px)`;
export const mediaQueryTablet = `@media only screen and (max-width: ${TABLET_WIDTH}px)`;
export const mediaQuerySmallTablet = `@media only screen and (max-width: ${SMALL_TABLET_WIDTH}px)`;
export const mediaQueryMobile = `@media only screen and (max-width: ${MOBILE_WIDTH}px)`;
export const mediaQueryMiniMobile = `@media only screen and (max-width: ${MINI_MOBILE_WIDTH}px)`;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    let tl;
    function handleResize() {
      clearTimeout(tl);
      tl = setTimeout(() => {
        setWindowDimensions(getWindowDimensions());
      }, 120);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  return {
    isDesktop: width <= DESKTOP_WIDTH,
    isMiniDesktop: width <= MINI_DESKTOP_WIDTH,
    isTablet: width <= TABLET_WIDTH,
    isSmallTablet: width <= SMALL_TABLET_WIDTH,
    isMobile: Math.min(width, height) <= MOBILE_WIDTH,
    isLandscape: width > height,
    isPortrait: height > width
  };
};

export const useMedia = (query: string, defaultState: boolean = false) => {
  const [state, setState] = useState(
    isClient ? () => window.matchMedia(query).matches : defaultState
  );

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener('change', onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.addEventListener('change', onChange);
    };
  }, [query]);

  return state;
};
