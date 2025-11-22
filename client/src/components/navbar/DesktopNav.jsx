import LoginButton from "../ui/LoginButton";
import { NavLink } from "react-router-dom";
import ShoppingCartButton from "../cart/ShoppingCartButton";

const DesktopNav = ({
  navLinks,
  selectedItems,
  textColor,
  buttonClass,
  user,
  handleLogout,
}) => {
  return (
    <div className={`hidden md:flex items-center gap-20 ${textColor}`}>
      <ul className="md:flex items-center text-lg gap-6">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => isActive && "nav-active"}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <LoginButton
          buttonClass={buttonClass}
          user={user}
          onClick={handleLogout}
        />
        <ShoppingCartButton items={selectedItems} />
      </div>
    </div>
  );
};

export default DesktopNav;
