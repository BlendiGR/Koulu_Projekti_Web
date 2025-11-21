import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Home from "./pages/home/Home.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Visit from "./pages/visit/Visit.jsx";
import Login from "./pages/login/Login.jsx";
import Cart from "./pages/cart/Cart.jsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Lisätkää tänne reittejä tarvittaessa
      { index: true, element: <Home /> }, // "/"
      { path: "menu", element: <Menu /> },
      { path: "visit", element: <Visit /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);
