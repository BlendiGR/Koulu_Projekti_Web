import LoginForm from "/src/components/ui/LoginForm";
import { useLang } from "/src/hooks/useLang";

const Login = () => {
  const { t } = useLang();

  return (
    <div className="flex items-center justify-center py-20">
      <LoginForm t={t} />;
    </div>
  );
};

export default Login;
