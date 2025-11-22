import { NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const LoginButton = ({ user, onClick, mobile = false, buttonClass = "" }) => {
  const baseClass =
    "bg-black-200 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer";

  const className = [baseClass, !mobile && buttonClass]
    .filter(Boolean)
    .join(" ");

  if (user) {
    return (
      <button className={className} onClick={onClick}>
        <LogOut />
        Logout
      </button>
    );
  }

  return (
    <NavLink to="/login" className={className}>
      <User />
      Login
    </NavLink>
  );
};

export default LoginButton;
