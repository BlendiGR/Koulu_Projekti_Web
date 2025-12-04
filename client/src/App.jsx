import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "/src/components/layout/MainLayout";
import AdminLayout from "/src/components/layout/AdminLayout";
import Home from "/src/pages/Home";
import Menu from "/src/features/menu/pages/Menu";
import Visit from "/src/pages/Visit";
import Login from "/src/features/auth/pages/Login";
import Profile from "/src/pages/Profile";
import Orders from "/src/features/orders/pages/Orders";
import ProtectedRoute from "/src/features/auth/components/ProtectedRoute";
import ProtectedRouteAdmin from "/src/features/auth/components/ProtectedRouteAdmin";
import Checkout from "/src/features/cart/pages/Checkout";

import { AuthProvider } from "/src/features/auth/context/AuthContext.jsx";
import { LanguageProvider } from "/src/context/LanguageContext.jsx";
import { CartProvider } from "/src/features/cart/context/ShoppingCartContext.jsx";
import ScrollToTop from "/src/utils/scrollToTop.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="visit" element={<Visit />} />
                <Route path="login" element={<Login />} />
                <Route path="checkout" element={<Checkout />} />

                {/*  Suojatut */}
                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="orders"
                  element={<Orders />}
                />
              </Route>

              {/* Admin Reitit */}
              <Route
                path="admin"
                element={
                  <ProtectedRouteAdmin>
                    <AdminLayout />
                  </ProtectedRouteAdmin>
                }
              >
                {/* Lisää tähän admin reitit */}
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
