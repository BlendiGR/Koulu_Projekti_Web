export default function getNavStyles({ isLanding, scrolled }) {
  const navLanding = scrolled
    ? "bg-beige drop-shadow-md"
    : "bg-transparent drop-shadow-none";

  const navNormal = "bg-beige drop-shadow-md";

  const navClass = `w-full fixed top-0 left-0 z-11 transition-all duration-700 ${
    isLanding ? navLanding : navNormal
  }`;

  const textColor = isLanding
    ? scrolled
      ? "text-black-200"
      : "text-white"
    : "text-black-200";

  const buttonClass = isLanding
    ? scrolled
      ? "bg-black-200 text-white hover:bg-gray-800"
      : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
    : "bg-black-200 text-white hover:bg-gray-800";

  return {
    navClass,
    textColor,
    buttonClass,
    logoIsBlack: isLanding ? scrolled : true,
  };
}
