import Logo from "./Logo";
import { theme } from "@/constants/theme";

export default function LoginHero() {
  return (
    <div className="mb-7 text-center">
      <div className="mb-4 flex justify-center">
        <Logo />
      </div>

      <h1
        className="text-3xl font-extrabold leading-tight sm:text-4xl"
        style={{
          color: theme.colors.textPrimary,
          fontFamily: theme.font.heading,
        }}
      >
        Empowering <span style={{ color: theme.colors.primary }}>Learning</span>
        ,
        <br />
        Simplifying Submissions
      </h1>

      <p
        className="mt-3 text-sm"
        style={{
          color: theme.colors.textSecondary,
        }}
      >
        One sign-in for admins, teachers and students — your role is read from
        your account.
      </p>
    </div>
  );
}
