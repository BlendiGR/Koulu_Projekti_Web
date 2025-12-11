import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useLang } from "/src/hooks/useLang";
import FeatureCard from "/src/components/common/ui/FeatureCard.jsx";

const Visit = () => {
  const { t } = useLang();
  const hours = [
    { label: t("footer.hours.weekdays"), time: "10:00 - 22:00" },
    { label: t("footer.hours.weekend"), time: "12:00 - 21:00" },
  ];

  const featureCards = [
    {
      icon: <MapPin size={40} className="text-red-100" />,
      glow: "bg-red-light",
      title: t("home.contact.location"),
      text: "Blablablakatu 4,\n00100 Helsinki",
    },
    {
      icon: <Phone size={40} className="text-green-100" />,
      glow: "bg-green-light",
      title: t("home.contact.phone"),
      text: `050 000 0000\n${t("home.contact.phone.text")}`,
    },
    {
      icon: <Mail size={40} className="text-blue-400" />,
      glow: "bg-blue-light",
      title: t("home.contact.email"),
      text: `info@web-fooder.fi\n${t("home.contact.email.text")}`,
    },
    {
      icon: <Clock size={40} className="text-red-500" />,
      glow: "bg-red-light",
      title: "Hours",
      text: `${hours[0].label} ${hours[0].time}\n${hours[1].label} ${hours[1].time}`,
    },
  ];
  return (
    <div>
      <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
        <h1 className="md:text-5xl text-4xl mb-4 pt-11">
          <span className="">Visit </span>
          <span className="text-red-100">Us</span>
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          We'd love to see you at foonder!
        </p>
        <div className="mt-16 lg:max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
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
    </div>
  );
};

export default Visit;
