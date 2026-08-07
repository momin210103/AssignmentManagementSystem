import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  allowedRoles: string[];
};

export default function RoleGuard({ allowedRoles }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
