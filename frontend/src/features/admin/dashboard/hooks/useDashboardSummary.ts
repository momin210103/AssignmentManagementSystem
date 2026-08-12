import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "../services/dashboardApi";

export function useDashboardSummary() {
  return useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: getDashboardSummary,
  });
}
