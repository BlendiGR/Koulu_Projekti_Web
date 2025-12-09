import LoginButton from "/src/components/common/ui/LoginButton.jsx";
import { NavLink } from "react-router-dom";
import ShoppingCartButton from "/src/features/cart/components/ShoppingCartButton.jsx";
import LangButton from "/src/components/common/ui/LangButton.jsx";

const DesktopNav = ({
  navLinks,
  textColor,
  buttonClass,
  user,
  handleLogout,
  onCartClick,
}) => {
  return (
    <div className={`hidden lg:flex items-center gap-20 ${textColor}`}>
      <ul className="md:flex items-center text-lg gap-6">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => isActive ? "nav-active" : undefined}
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
        <ShoppingCartButton onClick={onCartClick} />
        <LangButton color={textColor} />
      </div>
    </div>
  );
};

export default DesktopNav;
