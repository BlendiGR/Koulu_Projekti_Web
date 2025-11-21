import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks = [],
  ShoppingCartButton,
  selectedItems,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-999 bg-black/30 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Drawer panel */}
      <div
        className={`absolute top-0 left-0 h-full w-[80%] max-w-[320px] bg-white shadow-lg p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black-200"
        >
          <X size={28} />
        </button>

        {/* Links */}
        <ul className="flex flex-col gap-8 mt-14 text-black-200">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={onClose} className="text-xl">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">
          <button className="w-full bg-black-200 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer">
            Login
          </button>

          {ShoppingCartButton && (
            <ShoppingCartButton items={selectedItems} mobile />
          )}
        </div>
      </div>
    </div>
  );
}
