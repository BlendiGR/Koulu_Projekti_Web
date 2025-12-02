import { Award, Heart, Mail, MapPin, Phone, Users } from "lucide-react";
import { useLang } from "/src/hooks/useLang";

import FeatureCard from "/src/components/common/ui/FeatureCard.jsx";
import HeroSection from "/src/pages/HeroSection.jsx";
import InfoTile from "/src/components/common/ui/InfoTile.jsx";
import heroBackground from "/src/assets/images/Hero-Background.png";
import HorizontalReviewSlider from "/src/components/common/ui/HorizontalReviewSlider.jsx";
import { reviews } from "/src/config/reviews.js";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import { mostBuyedProducts } from "/src/config/mostBuyedSection.js";

const Home = () => {
  const { t } = useLang();

  const contactCards = [
    {
      icon: <MapPin size={44} className="text-red-100" />,
      title: t("home.contact.location"),
      text: "Blablablakatu 4,\n00100 Helsinki",
    },
    {
      icon: <Phone size={44} className="text-green-100" />,
      title: t("home.contact.phone"),
      text: `050 000 0000\n${t("home.contact.phone.text")}`,
    },
    {
      icon: <Mail size={44} className="text-blue-400" />,
      title: t("home.contact.email"),
      text: `info@web-fooder.fi\n${t("home.contact.email.text")}`,
    },
  ];

  const featureCards = [
    {
      icon: <Heart size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: t("home.features.made"),
      text: t("home.features.made.text"),
    },
    {
      icon: <Users size={40} className="text-green-500" />,
      glow: "bg-green-light",
      title: t("home.features.community"),
      text: t("home.features.community.text"),
    },
    {
      icon: <Award size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: t("home.features.award"),
      text: t("home.features.award.text"),
    },
  ];

  return (
    <div>
      <HeroSection
        backgroundImage={heroBackground}
        headline={
          <>
            <span className="text-red-100 shadow-md">{t("hero.taste")} </span>
            <span className="shadow-md">{t("hero.real")} </span>
            <span className="text-green-100 shadow-md">{t("hero.food")}</span>
          </>
        }
        subheading={t("hero.subheading")}
        ctaText={t("hero.cta")}
        ctaTo="/menu"
      />

      <section className="p-8 mt-20 bg-white text-center">
        <h2 className="md:text-5xl text-4xl mb-4">
          {t("home.about.titlep1")}{" "}
          <span className="text-red-100">{t("home.about.titlep2")}</span>
        </h2>

        <div className="lg:max-w-[70%] mx-auto space-y-8 mt-10">
          <p className="lg:text-xl text-lg text-black-100">
            {t("home.about.p1")}
          </p>

          <p className="lg:text-xl text-lg text-gray-600">
            {t("home.about.p2")}
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

      <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
        <h3 className="md:text-5xl text-4xl mb-4 pt-11">
          {t("home.mostOrdered.title")}
        </h3>
        <div className="flex md:flex-row flex-col justify-center items-center gap-10 mt-10">
          {mostBuyedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="py-20">
        <p className="md:text-5xl text-center text-4xl mb-4">
          {t("home.reviews.title")}
        </p>
        <p className="text-center">{t("home.reviews.subtitle")}</p>
        <div className="mt-10">
          <HorizontalReviewSlider reviews={reviews} />
        </div>
      </section>
    </div>
  );
};

export default Home;
