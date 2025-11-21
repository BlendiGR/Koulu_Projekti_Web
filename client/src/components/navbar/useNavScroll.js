import { useEffect, useState } from "react";

export default function useNavScroll(isLanding) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLanding) return;

    const onScroll = () => setScrolled(window.scrollY > 100);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLanding]);

  return { scrolled };
}
