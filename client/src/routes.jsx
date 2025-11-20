import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./layout/AppLayout.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Visit from "./pages/Visit.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> }, // "/"
      { path: "menu", element: <Menu /> },
      { path: "visit", element: <Visit /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
    ],
  },
]);
