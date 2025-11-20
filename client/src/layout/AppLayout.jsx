import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar.jsx";
import Footer from "../components/layout/Footer.jsx";
import { NAV_LINKS } from "../config/navigation.js";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <NavBar navLinks={NAV_LINKS} />
      <main className="mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
