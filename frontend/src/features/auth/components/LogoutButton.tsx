import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate("/");
  }

  return (
    <Button variant="secondary" fullWidth={false} onClick={handleLogout}>
      Logout
    </Button>
  );
}
