import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { getNavLinks } from "../../config/navigation.js";
import LogoWhite from "/src/assets/images/Fooder-Logo-White.png";
import HoursRow from "./HoursRow.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useLang } from "/src/hooks/useLang";

const Footer = () => {
  const { user } = useAuth();
  const { t } = useLang();

  const navLinks = getNavLinks(user, t);

  const hours = [
    { label: t("footer.hours.weekdays"), time: "10:00 - 22:00" },
    { label: t("footer.hours.weekend"), time: "12:00 - 21:00" },
  ];

  return (
    <footer className="bg-black-200 text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 px-5 md:grid-cols-5 gap-10 text-center md:text-left">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center md:items-start">
          <img src={LogoWhite} alt="Logo" className="h-10 mb-4" />
          <p className="text-brown-100 text-sm">{t("footer.since")}</p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">{t("footer.quickLinks")}</p>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block hover:underline text-brown-100"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">{t("footer.customerService")}</p>
          <p className="text-brown-100">050 000 000</p>
          <p className="text-brown-100">info@web-fooder.fi</p>
        </div>

        {/* Opening hours */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">{t("footer.openingHours")}</p>
          <div className="flex flex-col gap-3">
            {hours.map(({ label, time }) => (
              <HoursRow key={label} label={label} time={time} />
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">{t("footer.followUs")}</p>
          <div className="flex flex-row gap-3">
            <a href="#" aria-label="Instagram" className="text-brown-100">
              <Instagram />
            </a>
            <a href="#" aria-label="Facebook" className="text-brown-100">
              <Facebook />
            </a>
          </div>
        </div>
      </div>

      <hr className="mx-auto border-gray-800 mt-10 max-w-[90%]" />
      <p className="mx-auto mt-5 text-center text-sm text-brown-100">
        {t("footer.copyright")}
      </p>
    </footer>
  );
};

export default Footer;
