import { Outlet } from "react-router-dom";
import NavBar from "/src/components/layout/Navbar/NavBar.jsx";
import Footer from "/src/components/layout/Footer/Footer.jsx";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useLocation } from "react-router";
import { useAnnouncement } from "/src/hooks/api";

const MainLayout = () => {
  const { handleAutoLogin } = useAuth();
  const location = useLocation();
  const { getAnnouncements } = useAnnouncement();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
        const res = await getAnnouncements();
        setAnnouncement(res.data);
    };
    fetchAnnouncement();
    handleAutoLogin();
  }, []);

  const handleDismissAnnouncement = () => {
    console.log("clicked")
    setAnnouncement(null);
  };

  return (
    <div>
      <NavBar announcement={announcement} onDismiss={handleDismissAnnouncement} />
      <main className={location.pathname === "/" ? "" : announcement ? "mt-25 md:mt-31" : "mt-17 md:mt-22"}>
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;