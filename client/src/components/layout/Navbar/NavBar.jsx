import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import ShoppingCartButton from "/src/features/cart/components/ShoppingCartButton";
import CartDrawer from "/src/features/cart/components/CartDrawer";
import MobileDrawer from "/src/components/layout/Navbar/MobileDrawer";
import DesktopNav from "/src/components/layout/Navbar/DesktopNav";
import useNavScroll from "/src/hooks/useNavScroll.js";
import getNavStyles from "/src/components/layout/Navbar/getNavStyles";
import Announcement from "/src/components/layout/Announcement.jsx";

import LogoBlack from "/src/assets/images/Fooder-Logo-Black.png";
import LogoWhite from "/src/assets/images/Fooder-Logo-White.png";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { getNavLinks } from "/src/config/navigation.js";
import { useLang } from "/src/hooks/useLang";

const NavBar = ({ announcement, onDismiss }) => {
  const { t } = useLang();

  const { pathname } = useLocation();
  const isLanding = pathname === "/";

  const { scrolled } = useNavScroll(isLanding);
  const styles = getNavStyles({ isLanding, scrolled });

  const { navClass, textColor, buttonClass, logoIsBlack } = styles;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navLinks = getNavLinks(user, t);

  // Estä scrollia kun mobile menu on auki
  /*useEffect(() => {
    if (mobileMenuOpen || cartDrawerOpen) {
      const scrollY = window.scrollY;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen, cartDrawerOpen]);*/

  return (
    <>
      <nav className={navClass}>
        {announcement && <Announcement data={announcement} onDismiss={onDismiss} />}
        <div className="max-w-[90%] mx-auto flex items-center justify-between p-2">
          {/* Fooder Logo */}
          <Link to="/">
            <img
              src={logoIsBlack ? LogoBlack : LogoWhite}
              alt="Logo"
              className="w-35 md:w-50 h-auto active:scale-102"
            />
          </Link>

          <DesktopNav
            navLinks={navLinks}
            textColor={textColor}
            user={user}
            handleLogout={handleLogout}
            buttonClass={buttonClass}
            onCartClick={() => setCartDrawerOpen(true)}
          />

          {/* Mobile cart button & hamburger menu */}
          {!mobileMenuOpen && !cartDrawerOpen && (
            <div className={`lg:hidden flex items-center gap-4 ${textColor}`}>
              <ShoppingCartButton 
                mobile 
                onClick={() => setCartDrawerOpen(true)} 
              />
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`mr-1 ${textColor}`}
              >
                <Menu size={30} />
              </button>
            </div>
          )}
        </div>
      </nav>
      <MobileDrawer
        isOpen={mobileMenuOpen}
        handleLogout={handleLogout}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
        navLinks={navLinks}
      />
      <CartDrawer 
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </>
  );
};

export default NavBar;