import { useEffect, useState } from 'react';
import { Size } from '../types';

const getSize = (): Size => ({ height: window.innerHeight, width: window.innerWidth });

export const useWindowSize = (): Size => {
  const [windowSize, setWindowSize] = useState(getSize);

  const handleResize = () => {
    setWindowSize(getSize());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
