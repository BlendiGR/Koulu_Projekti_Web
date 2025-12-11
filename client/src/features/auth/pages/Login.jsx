import { useState } from "react";
import { useLang } from "/src/hooks/useLang";
import LoginForm from "/src/features/auth/components/LoginForm";
import RegisterForm from "/src/features/auth/components/RegisterForm";
import heroBackground from "/src/assets/images/Hero-Background.png";
import loginImage from "/src/assets/images/Login.png";

const Login = () => {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col md:flex-row">
      <div
        className="flex flex-col items-center md:items-end justify-center py-3 px-4 md:pr-12 w-full md:w-1/2 bg-cover bg-center mobile-bg-only" // mobile-bg-only custom class to display background image only on mobile 
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      >
        <div className="w-full min-h-screen max-w-md p-6 mb-10">
          <div className="text-center mb-10">
            <h1 className="text-white md:text-black text-5xl mt-5 font-extrabold">
              Welcome to <span className="text-red-600">Fooder</span>
            </h1>
            <p className="text-white md:text-gray-600 mt-2 text-lg font-medium mt-5">
              Sign in to order your favorite meals
            </p>
          </div>

          <div className="bg-beige rounded-xl shadow-md p-6">
            <div className="flex mb-6 rounded-full bg-gray-100 p-1 border border-gray-200">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 px-6 text-center text-md font-medium rounded-full transition-all duration-300 ${
                  activeTab === "login"
                    ? "bg-green-200 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-2 px-6 text-center text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === "register"
                    ? "bg-green-200 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                Register
              </button>
            </div>

            <div className="relative overflow-hidden transition-all duration-300">
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeTab === "login"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <LoginForm t={t} />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeTab === "register"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full absolute inset-0 pointer-events-none"
                }`}
              >
                <RegisterForm t={t} state={setActiveTab} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        <img
          src={loginImage}
          alt="Login Page Image"
          className="w-full h-full object-cover transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Login;