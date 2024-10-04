import { ToastStateType } from "../components/CustomToast/customToast.types";
import { ToastSeverity } from "../enums/customToast.enums";

export const defaultToast: ToastStateType = {
  isOpen: false,
  content: "",
  duration: 0,
  severity: ToastSeverity.SUCCESS,
};
