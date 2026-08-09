import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
// import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormData } from "@/features/auth/validation/loginSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const auth = useAuth();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      auth.login(response.token, {
        fullName: response.fullName,
        email: response.email,
        role: response.role,
      });

      switch (response.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;

        case "Teacher":
          navigate("/teacher/dashboard");
          break;

        default:
          navigate("/student/dashboard");
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <div className="mb-8">
        <h2 className="mt-4 ml-4 text-3xl font-bold">Welcome Back</h2>

        <p className="mt-2 ml-4 text-sm text-slate-500">Sign in to continue.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-4 sm:space-y-5 sm:px-8"
      >
        <Input
          label="Email Address"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />

          <button type="button" className="text-sm text-blue-600">
            Forgot password?
          </button>
        </div> */}

        <Button
          type="submit"
          rightIcon={<ArrowRight size={18} />}
          className="mt-2 mb-2"
        >
          Sign In
        </Button>
      </form>
    </Card>
  );
}
