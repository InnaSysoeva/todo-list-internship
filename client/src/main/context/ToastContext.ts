import { ToastContextType } from "../components/CustomToast/customToast.types";
import { createContext } from "react";
import { defaultToastState } from "../constants/customToast.default";

export const ToastContext = createContext<ToastContextType>({
  handleCloseToast: () => {},
  handleOpenToast: () => {},
  toast: defaultToastState,
});
