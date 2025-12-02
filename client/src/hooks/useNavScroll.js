import { useEffect, useState } from "react";

const useNavScroll = (isLanding) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) {
      setScrolled(false);
      return;
    }

    setScrolled(window.scrollY > 100);

    const onScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  return { scrolled };
};

export default useNavScroll;
