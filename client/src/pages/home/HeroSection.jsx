import { Link } from "react-router-dom";

const HeroSection = ({
  backgroundImage,
  headline,
  subheading,
  ctaText,
  ctaTo,
}) => {
  return (
    <section
      className="
        relative
        h-screen
        -mt-16
        pt-16
        bg-cover bg-center
        flex flex-col items-center justify-center text-center
        px-4
        rounded-b-3xl
      "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 rounded-b-3xl shadow-2xl"></div>

      <div className="relative z-10 space-y-4">
        <h1 className="text-5xl md:text-7xl font-semibold text-white leading-tight">
          {headline}
        </h1>

        <p className="text-gray-100 max-w-xl mx-auto text-lg md:text-xl">
          {subheading}
        </p>

        {ctaText && ctaTo && (
          <Link
            to={ctaTo}
            className="flex justify-center items-center mt-6 px-10 py-3 text-2xl md:text-4xl bg-red-100 text-white rounded-xl hover:bg-red-200 active:bg-red-200 transition mx-auto text-center w-fit"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
