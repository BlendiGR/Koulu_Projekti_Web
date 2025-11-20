import { Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoBlack from "../../public/Fooder-Logo-Black.png";
import ShoppingCartButton from "../ui/ShoppingCartButton";
import MobileDrawer from "../ui/MobileDrawer";

// SelectedItems prop kertoo montako tuotetta on valittu ostoskoriin ja päivittää sen mukaan ostoskorin nappulan.
const NavBar = ({ selectedItems = 0, navLinks = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-beige drop-shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2">
        {/* Logo */}
        <Link to="/">
          <img src={LogoBlack} alt="Logo" className="w-30 md:w-35 h-auto" />
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-20 text-black-200">
          <ul className="md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button className="bg-black-200 hover:bg-gray-800 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer">
              <User />
              Login
            </button>

            <ShoppingCartButton items={selectedItems} />
          </div>
        </div>

        {/* Mobile hamburger */}
        {!mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden mr-1"
          >
            <Menu size={30} />
          </button>
        )}

        {/* Mobile menu */}
        <MobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
          ShoppingCartButton={ShoppingCartButton}
          selectedItems={selectedItems}
        />
      </div>
    </nav>
  );
};

export default NavBar;
