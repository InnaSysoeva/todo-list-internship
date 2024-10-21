import { ToastContextType } from "../components/CustomToast/customToast.types";
import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export const useToast = (): ToastContextType => {
  return useContext(ToastContext);
};
