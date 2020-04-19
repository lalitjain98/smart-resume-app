import React, { useEffect, useState } from 'react';
import ControlledLoader from './ControlledLoader';

const SplashScreen = ({ children, ...props }) => {
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setLoaded(true);
    }
    window.onload = () => {
      setLoaded(true);
    };
  });
  return (
    <ControlledLoader isLoaded={isLoaded}>
      {
        children
      }
    </ControlledLoader>
  );
};

export default SplashScreen;
