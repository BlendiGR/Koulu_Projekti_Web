import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import ShoppingCartButton from "../cart/ShoppingCartButton";
import MobileDrawer from "./MobileDrawer";
import DesktopNav from "./DesktopNav";
import useNavScroll from "../../hooks/useNavScroll.js";
import getNavStyles from "./getNavStyles";

import LogoBlack from "/src/assets/images/Fooder-Logo-Black.png";
import LogoWhite from "/src/assets/images/Fooder-Logo-White.png";
import { useAuth } from "../../hooks/useAuth.js";
import { getNavLinks } from "../../config/navigation.js";
import { useLang } from "/src/hooks/useLang";

const NavBar = () => {
  const { t } = useLang();

  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  const { scrolled } = useNavScroll(isLanding);
  const styles = getNavStyles({ isLanding, scrolled });

  const { navClass, textColor, buttonClass, logoIsBlack } = styles;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navLinks = getNavLinks(user, t);

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
            textColor={textColor}
            user={user}
            handleLogout={handleLogout}
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
        handleLogout={handleLogout}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        navLinks={navLinks}
        ShoppingCartButton={ShoppingCartButton}
      />
    </>
  );
};

export default NavBar;
