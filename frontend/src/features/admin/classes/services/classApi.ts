import {api} from "@/api/axios";
import type { Class } from "../types/class";

export const getClasses = async (): Promise<Class[]> => {
  const response = await api.get("/admin/classes/getall");

  return response.data;
};
