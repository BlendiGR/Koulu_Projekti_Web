import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function MobileDrawer({
  isOpen,
  onClose,
  navLinks = [],
  ShoppingCartButton,
  selectedItems,
}) {
  return (
    <div
      className={`md:hidden absolute left-0 right-0 top-full bg-beige shadow-lg z-10 border-t overflow-hidden
        transition-all duration-300 ease-out
        ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      {/* Close button */}
      <button onClick={onClose} className="absolute top-5 right-5 p-2">
        <X />
      </button>

      {/* Links */}
      <ul className="flex flex-col items-center gap-8 p-4 text-black-200 mt-5">
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} onClick={onClose} className="text-xl">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4 pb-4 mt-5">
        <button className="w-[50%] bg-black-200 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer">
          Login
        </button>

        {/* ShoppingCartButton injected from NavBar */}
        {ShoppingCartButton && (
          <ShoppingCartButton items={selectedItems} mobile />
        )}
      </div>
    </div>
  );
}
