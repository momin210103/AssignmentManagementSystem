import { GraduationCap } from "lucide-react";
import { theme } from "@/constants/theme";

type LogoProps = {
  dark?: boolean;
};

export default function Logo({ dark = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
        style={{
          background: `conic-gradient(from 200deg, ${theme.colors.primary}, ${theme.colors.primaryHover}, ${theme.colors.primary})`,
        }}
      >
        <GraduationCap size={16} color="#fff" />
      </div>

      <div className="leading-tight">
        <div
          className="text-sm font-extrabold"
          style={{
            color: dark ? theme.colors.textWhite : theme.colors.textPrimary,
            fontFamily: theme.font.heading,
          }}
        >
          The Register
        </div>

        <div
          className="text-[10px] font-medium tracking-[0.06em]"
          style={{
            color: dark ? "#B9CBEA" : theme.colors.textSecondary,
          }}
        >
          BY ONNOROKOM
        </div>
      </div>
    </div>
  );
}
