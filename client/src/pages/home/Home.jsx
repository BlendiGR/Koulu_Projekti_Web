import { Award, Heart, Mail, MapPin, Phone, Users } from "lucide-react";

import FeatureCard from "../../components/ui/FeatureCard.jsx";
import HeroSection from "./HeroSection.jsx";
import InfoTile from "../../components/ui/InfoTile.jsx";
import heroBackground from "/src/assets/images/Hero-Background.png";
import HorizontalReviewSlider from "../../components/ui/HorizontalReviewSlider.jsx";
import { reviews } from "../../config/reviews.js";

const Home = () => {
  const contactCards = [
    {
      icon: <MapPin size={44} className="text-red-100" />,
      title: "Location",
      text: "Blablablakatu 4,\n00100 Helsinki",
    },
    {
      icon: <Phone size={44} className="text-green-100" />,
      title: "Phone",
      text: "050 000 0000\nCall us anytime!",
    },
    {
      icon: <Mail size={44} className="text-blue-400" />,
      title: "Email",
      text: "info@web-fooder.fi\nWe'll respond quickly!",
    },
  ];

  const featureCards = [
    {
      icon: <Heart size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: "Made with Love",
      text: "Every burger is crafted with care and passion by our experienced chefs",
    },
    {
      icon: <Users size={40} className="text-green-500" />,
      glow: "bg-green-light",
      title: "Community First",
      text: "We're proud to support local farmers and give back to our community",
    },
    {
      icon: <Award size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: "Award Winning",
      text: 'Voted "Best Burger in Town" for 5 consecutive years',
    },
  ];

  return (
    <div>
      <HeroSection
        backgroundImage={heroBackground}
        headline={
          <>
            <span className="text-red-100">Taste </span>
            <span>The </span>
            <span className="text-green-100">Difference</span>
          </>
        }
        subheading="Crafted with passion, served with love. Experience the best comfort food in town."
        ctaText="Order Now"
        ctaTo="/menu"
      />

      <section className="p-8 mt-20 bg-white text-center">
        <h2 className="md:text-5xl text-4xl mb-4">
          About <span className="text-red-100">Fooder</span>
        </h2>

        <div className="lg:max-w-[70%] mx-auto space-y-8 mt-10">
          <p className="lg:text-xl text-lg text-black-100">
            Since day one, Fooder Pizzeria has been the neighborhood&apos;s
            go-to spot for fast, reliable comfort food. From fresh pizzas to
            stacked burgers and crispy fries, we serve the classics people
            actually want made quick and made right. Located in the heart of the
            city, we&apos;re built for anyone looking for good food without the
            wait.
          </p>

          <p className="lg:text-xl text-lg text-gray-600">
            Everything we serve starts with fresh ingredients and
            straightforward preparation. Our dough is mixed daily, our patties
            are cooked to order, and our fries are made hot and crisp every
            time. We source our produce and toppings from trusted local
            suppliers.
          </p>
        </div>

        <div
          className="mt-16 lg:max-w-[80%] mx-auto bg-beige p-6 rounded-3xl
                  flex flex-col lg:flex-row justify-between gap-8"
        >
          {contactCards.map(({ icon, title, text }) => (
            <InfoTile key={title} icon={icon} title={title} text={text} />
          ))}
        </div>

        <div className="mt-16 lg:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map(({ icon, title, text, glow }) => (
            <FeatureCard
              key={title}
              icon={icon}
              title={title}
              text={text}
              glow={glow}
            />
          ))}
        </div>
      </section>

      <section className="h-screen mt-20 bg-beige shadow-xl rounded-3xl"></section>

      <section className="py-20">
        <p className="md:text-5xl text-center text-4xl mb-4">
          Customer <span className="text-red-100">Reviews</span>
        </p>
        <p className="text-center">See what our customers say about us!</p>
        <div className="mt-10 ">
          <HorizontalReviewSlider reviews={reviews} />
        </div>
      </section>
    </div>
  );
};

export default Home;
