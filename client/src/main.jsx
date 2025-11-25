import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes.jsx";
import { UserProvider } from "./auth/Auth.jsx";
import { ShoppingCart } from "./contexts/ShoppingCartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ShoppingCart>
      <RouterProvider router={router} />
    </ShoppingCart>
  </UserProvider>
);
