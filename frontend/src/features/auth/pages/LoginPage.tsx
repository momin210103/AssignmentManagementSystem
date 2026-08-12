import LoginHero from "@/features/auth/components/LoginHero";
import LoginForm from "@/features/auth/components/LoginForm";
import DemoAccounts from "@/features/auth/components/DemoAccounts";
import { theme } from "@/constants/theme";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const form = useLoginForm();

  const handleDemoSelect = (email: string, password: string) => {
    form.setValue("email", email, { shouldValidate: true });
    form.setValue("password", password, { shouldValidate: true });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(
          180deg,
          ${theme.colors.background} 0%,
          ${theme.colors.backgroundSecondary} 100%
        )`,
      }}
    >
      <Navbar />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <LoginHero />

          <div className="mx-auto w-full max-w-md">
            <LoginForm form={form} />

            <DemoAccounts onSelect={handleDemoSelect} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
