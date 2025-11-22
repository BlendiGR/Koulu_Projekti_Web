import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Visit from "./pages/visit/Visit";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "visit", Component: Visit },
      { path: "login", Component: Login },
      {
        path: "cart",
        element: (
          /// Testi
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
