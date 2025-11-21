import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
import ShoppingCartButton from "../cart/ShoppingCartButton";

const DesktopNav = ({ navLinks, selectedItems, textColor, buttonClass }) => {
  return (
    <div className={`hidden md:flex items-center gap-20 ${textColor}`}>
      <ul className="md:flex items-center text-lg gap-6">
        {navLinks.map((link) => (
          <NavLink
            to={link.to}
            key={link.to}
            className={({ isActive }) => isActive && "nav-active"}
          >
            {link.label}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition ${buttonClass}`}
        >
          <User />
          Login
        </button>

        <ShoppingCartButton items={selectedItems} />
      </div>
    </div>
  );
};

export default DesktopNav;
