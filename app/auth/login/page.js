import LoginPage from "@/components/LoginForm";

function AuthPage() {
  return (
    <div className=" fixed inset-0 backdrop-blur-xs bg-black/30 transition-all duration-500">
      <LoginPage />
    </div>
  );
}
export default AuthPage