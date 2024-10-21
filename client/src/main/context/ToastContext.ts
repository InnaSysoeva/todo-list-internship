import { ToastContextType } from "../components/CustomToast/customToast.types";
import { createContext } from "react";
import { defaultToast } from "../constants/customToast.default";

export const ToastContext = createContext<ToastContextType>({
  handleCloseToast: () => {},
  handleOpenToast: () => {},
  toast: defaultToast,
});
