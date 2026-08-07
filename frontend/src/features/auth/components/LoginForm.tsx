import { ArrowRight } from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";

import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import type { LoginFormData } from "@/features/auth/validation/loginSchema";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();
  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      console.log(response);
      alert("Login successful!");

      // Next Step
      // Navigate Dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome Back</h2>

        <p className="mt-2 text-sm text-slate-500">Sign in to continue.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />

          <button type="button" className="text-sm text-blue-600">
            Forgot password?
          </button>
        </div>

        <Button type="submit" rightIcon={<ArrowRight size={18} />}>
          Sign In
        </Button>
      </form>
    </Card>
  );
}
