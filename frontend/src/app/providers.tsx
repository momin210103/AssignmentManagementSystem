import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "@/contexts/AuthContext";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
