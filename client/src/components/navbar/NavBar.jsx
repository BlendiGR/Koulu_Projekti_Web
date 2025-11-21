import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import ShoppingCartButton from "../cart/ShoppingCartButton";
import MobileDrawer from "./MobileDrawer";
import DesktopNav from "./DesktopNav";
import useNavScroll from "./useNavScroll";
import getNavStyles from "./getNavStyles";

import LogoBlack from "/src/assets/images/Fooder-Logo-Black.png";
import LogoWhite from "/src/assets/images/Fooder-Logo-White.png";
import { useAuth } from "../../auth/Auth.jsx";
import { getNavLinks } from "../../config/navigation.js";

const NavBar = ({ selectedItems = 0 }) => {
  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  const { scrolled } = useNavScroll(isLanding);
  const styles = getNavStyles({ isLanding, scrolled });

  const { navClass, textColor, buttonClass, logoIsBlack } = styles;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useAuth();
  const navLinks = getNavLinks(user);

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto flex items-center justify-between p-2">
          {/* Fooder Logo */}
          <Link to="/">
            <img
              src={logoIsBlack ? LogoBlack : LogoWhite}
              alt="Logo"
              className="w-35 md:w-50 h-auto"
            />
          </Link>

          <DesktopNav
            navLinks={navLinks}
            selectedItems={selectedItems}
            textColor={textColor}
            buttonClass={buttonClass}
          />

          {/* Hamppari Menun nappi */}
          {!mobileMenuOpen && (
            <button
              onClick={() => {
                setMobileMenuOpen(true);
              }}
              className={`md:hidden mr-1 ${textColor}`}
            >
              <Menu size={30} />
            </button>
          )}
        </div>
      </nav>
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        ShoppingCartButton={ShoppingCartButton}
        selectedItems={selectedItems}
      />
    </>
  );
};

export default NavBar;
