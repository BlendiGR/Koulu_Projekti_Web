import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../config/navigation.js";
import LogoWhite from "../../public/Fooder-Logo-White.png";
import HoursRow from "./HoursRow.jsx";

const Footer = () => {
  const hours = [
    { label: "Mon - Fri", time: "10:00 - 22:00" },
    { label: "Weekend", time: "12:00 - 21:00" },
  ];

  return (
    <footer className="bg-black-200 text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 px-5 md:grid-cols-5 gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <img src={LogoWhite} alt="Logo" className="h-10 mb-4" />
          <p className="text-brown-100 text-sm">Serving since 2025.</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">Quick Links</p>
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block hover:underline text-brown-100"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">Customer Services</p>
          <p className="text-brown-100">050 000 000</p>
          <p className="text-brown-100">info@web-fooder.fi</p>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">Opening Hours</p>
          <div className="flex flex-col gap-3">
            {hours.map(({ label, time }) => (
              <HoursRow key={label} label={label} time={time} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold mb-2">Follow Us</p>
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
        (c) 2025 Fooder
      </p>
    </footer>
  );
};

export default Footer;
