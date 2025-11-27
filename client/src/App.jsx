// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Visit from "./pages/visit/Visit";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/orders/Orders";
import ProtectedRoute from "./auth/ProtectedRoute";

import { UserProvider } from "./auth/Auth.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { CartProvider } from "./contexts/ShoppingCartContext.jsx";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="visit" element={<Visit />} />
                <Route path="login" element={<Login />} />
                <Route path="cart" element={<Cart />} />

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
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
