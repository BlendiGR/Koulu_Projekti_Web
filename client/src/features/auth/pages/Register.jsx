import RegisterForm from "/src/components/common/ui/RegisterForm";
import { useLang } from "/src/hooks/useLang";

const Register = () => {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">
          Welcome to <span className="text-red-600">Fooder</span>
        </h1>
        <p className="text-gray-600 mt-2">Sign up to order your foodie meals</p>
      </div>

      <RegisterForm t={t} />
    </div>
  );
};

export default Register;
