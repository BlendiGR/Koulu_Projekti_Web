import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect } from "react";
import LoginButton from "/src/components/common/ui/LoginButton.jsx";
import LangButton from "/src/components/common/ui/LangButton.jsx";

const MobileDrawer = ({
  isOpen,
  onClose,
  user,
  handleLogout,
  navLinks = [],
  ShoppingCartButton,
  selectedItems,
}) => {
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
        <ul className="flex flex-col gap-8 mt-14 text-black-200 text-xl">
          {navLinks.map((link) => (
            <li key={link.to} className="active:text-red-200">
              <NavLink
                to={link.to}
                onClick={onClose}
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-10">
          <LoginButton user={user} onClick={handleLogout} mobile />

          {ShoppingCartButton && <ShoppingCartButton mobile />}
          <LangButton />
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
