import { NavLink } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useLang } from "/src/hooks/useLang";

const LoginButton = ({ user, onClick, mobile = false, buttonClass = "" }) => {
  const { t } = useLang();
  const baseClass =
    "bg-black-200 active:bg-gray-200 text-white font-medium px-4 py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer";

  const className = [baseClass, !mobile && buttonClass]
    .filter(Boolean)
    .join(" ");

  if (user) {
    return (
      <button className={className} onClick={onClick}>
        <LogOut />
        {t("nav.signout")}
      </button>
    );
  }

  return (
    <NavLink to="/login" className={className} onClick={onClick}>
      <User />
      {t("nav.login")}
    </NavLink>
  );
};

export default LoginButton;
