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
      text: "Laurinkatu 34, \n08100 Lohja",
    },
    {
      icon: <Phone size={40} className="text-green-100" />,
      glow: "bg-green-light",
      title: t("home.contact.phone"),
      text: `050 000 0000\n${t("home.contact.phoneText")}`,
    },
    {
      icon: <Mail size={40} className="text-blue-400" />,
      glow: "bg-blue-light",
      title: t("home.contact.email"),
      text: `info@web-fooder.fi\n${t("home.contact.emailText")}`,
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
        <h1 className="md:text-5xl text-4xl mb-4 pt-11 font-bold">
          <span className="">{t("visit.visit")} </span>
          <span className="text-red-100">{t("visit.us")}</span>
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          {t("visit.subheading")}
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
        <div className="mt-12 pb-8">
          <h2 className="text-3xl font-semibold mb-6">{t("visit.title")}</h2>
          <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7919.543725023565!2d24.05158077125056!3d60.248805201158916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468dbf7a90feb01d%3A0x31e2efe9e67459d!2sLaurinkatu%2034%2C%2008100%20Lohja!5e0!3m2!1sfi!2sfi!4v1765452181727!5m2!1sfi!2sfi"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            ></iframe>
          </div>
          <div className="mt-8 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">{t("visit.publicTransport")}</h3>
              <p className="text-gray-700">
                {t("visit.transportInfo")}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-3">{t("visit.parking")}</h3>
              <p className="text-gray-700">
                {t("visit.parkingInfo")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visit;