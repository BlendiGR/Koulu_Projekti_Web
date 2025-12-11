import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "/src/components/layout/MainLayout";
import Home from "/src/pages/Home";
import Menu from "/src/features/menu/pages/Menu";
import Visit from "/src/pages/Visit";
import Login from "/src/features/auth/pages/Login";
import Profile from "/src/pages/Profile";
import Orders from "/src/features/orders/pages/Orders";
import ProtectedRoute from "/src/features/auth/components/ProtectedRoute";
import ProtectedRouteAdmin from "/src/features/auth/components/ProtectedRouteAdmin";
import Checkout from "/src/features/cart/pages/Checkout";
import Success from "/src/features/cart/pages/Success";
import OrderTrack from "/src/features/orders/pages/OrderTrack";
import AdminPanel from "/src/features/admin/pages/AdminPanel";

import Review from "/src/features/review/pages/Review";

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
                <Route 
                  path="review" 
                  element={
                    <ProtectedRoute>
                      <Review />
                    </ProtectedRoute>
                  } 
                />
                {/*  Suojatut */}
                <Route
                  path="checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />


                <Route
                  path="success/:orderId"
                  element={
                    <ProtectedRoute>
                      <Success />
                    </ProtectedRoute>
                  }
                />

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
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="orders/:orderId"
                  element={
                    <ProtectedRoute>
                      <OrderTrack />
                    </ProtectedRoute>
                  }
                />
                  <Route
                    path="admin"
                    element={
                      <ProtectedRouteAdmin>
                        <AdminPanel />
                      </ProtectedRouteAdmin>
                    }
                  />
              </Route>

            </Routes>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;