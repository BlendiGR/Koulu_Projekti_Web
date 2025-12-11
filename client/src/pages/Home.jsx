import { Award, Heart, Mail, MapPin, Phone, Users } from "lucide-react";
import { useLang } from "/src/hooks/useLang";
import { useState, useEffect } from "react";
import {useProduct} from "../hooks/api/";
import FeatureCard from "/src/components/common/ui/FeatureCard.jsx";
import HeroSection from "/src/pages/HeroSection.jsx";
import heroBackground from "/src/assets/images/Hero-Background.png";
import HorizontalReviewSlider from "/src/components/common/ui/HorizontalReviewSlider.jsx";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import { useReview } from "/src/hooks/api";
import { useLoading } from "/src/hooks/useLoading";
import { formatDate } from "/src/utils/formatters";


const Home = () => {
  const { t } = useLang();
  const { getReviews } = useReview();
  const { getProducts } = useProduct();
  const { loading, withLoading } = useLoading();

  const [reviews, setReviews] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      await withLoading(async () => {
        const res = await getReviews({skip: 0, take: 10, isActive: true});
        if (res.success && res.data) {
          const transformedReviews = res.data.data.map(review => ({
            text: review.review,
            author: review.reviewer || "Anonymous",
            timeAgo: formatDate(review.createdAt),
            rating: review.rating
          }));
          setReviews(transformedReviews);
        }
      });
    };
    
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      const res = await getProducts({ skip: 0, take: 3, isActive: true });
      if (res.success && res.data) {
        // adjust according to your backend pagination shape
        setRandomProducts(res.data.data || res.data);
      }
    };

    fetchRandomProducts();
  }, []);

  const featureCards = [
    {
      icon: <Heart size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: t("home.features.made"),
      text: t("home.features.madeText"),
    },
    {
      icon: <Users size={40} className="text-green-500" />,
      glow: "bg-green-light",
      title: t("home.features.community"),
      text: t("home.features.communityText"),
    },
    {
      icon: <Award size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: t("home.features.award"),
      text: t("home.features.awardText"),
    },
  ];

  return (
    <div className="bg-beige">
      <HeroSection
        backgroundImage={heroBackground}
        headline={
          <>
            <span className="text-red-100">{t("hero.taste")} </span>
            <span>{t("hero.our")} </span>
            <span>{t("hero.meat")}</span>
          </>
        }
        subheading={t("hero.subheading")}
        ctaText={t("hero.cta")}
        ctaTo="/menu"
      />

      <section className="p-8 mt-25 bg-beige text-center">
        <h2 className="md:text-5xl text-4xl mb-4 font-bold">
          {t("home.about.titlep1")}{" "}
          <span className="text-red-100">{t("home.about.titlep2")}</span>
        </h2>

        <div className="lg:max-w-[70%] mx-auto space-y-8 mt-10">
          <p className="lg:text-xl text-lg text-black-100 font-medium">
            {t("home.about.p1")}
          </p>
          <p className="lg:text-xl text-lg text-gray-600">
            {t("home.about.p2")}
          </p>
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

      <section className="py-25 mt-20 bg-white text-center shadow-xl rounded-3xl">
        <h3 className="md:text-5xl text-4xl mb-4 font-bold">
          {t("home.mostOrdered.titleOne")}{" "}
          <span className="text-red-100">{t("home.mostOrdered.titleTwo")}</span>
        </h3>
        <div className="flex max-w-7xl mx-auto md:flex-row flex-col justify-center items-center gap-10 mt-10">
          {randomProducts.map((item, idx) => (
            <ProductCard key={item.productId} item={item} rank={idx + 1} bgColor="beige" />
          ))}
        </div>
      </section>

      <section className="py-25">
        <p className="md:text-5xl text-center text-4xl mb-4 font-bold">
          {t("home.reviews.titleOne")}
          <span className="text-red-100">{t("home.reviews.titleTwo")}</span>
        </p>
        <p className="text-center font-medium">{t("home.reviews.subtitle")}</p>
        <div className="mt-10">
          {loading ? (
            <p className="text-center text-gray-500">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <HorizontalReviewSlider reviews={reviews} />
          ) : (
            <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;