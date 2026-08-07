import LoginHero from "@/features/auth/components/LoginHero";
import LoginForm from "@/features/auth/components/LoginForm";
import DemoAccounts from "@/features/auth/components/DemoAccounts";
import { theme } from "@/constants/theme";

export default function LoginPage() {
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
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-2">
          <LoginHero />

          <div>
            <LoginForm />

            <DemoAccounts
              onSelect={(email, password) => {
                console.log(email, password);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
