import { useState, useEffect } from "react";
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleSize();

    //  Listening the window size whenever windows resize
    window.addEventListener("resize", handleSize);

    // Preventing to memory leakage
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
};

export default useWindowSize;
