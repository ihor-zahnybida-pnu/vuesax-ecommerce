import { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): WindowDimensions => {
    if (typeof window === 'undefined') {  return { width: 0, height: 0} };

    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };

};

export const useWindowDimensions = (): WindowDimensions => {
  
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = (): void => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
