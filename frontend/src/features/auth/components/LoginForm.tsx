import { ArrowRight } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
// import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormData } from "@/features/auth/validation/loginSchema";

type Props = {
  form: UseFormReturn<LoginFormData>;
};

export default function LoginForm({ form }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

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
      <div className="px-4 py-2 sm:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome Back</h2>

          <p className="mt-2 text-sm text-slate-500">Sign in to continue.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5"
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
            className="mt-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Card>
  );
}
