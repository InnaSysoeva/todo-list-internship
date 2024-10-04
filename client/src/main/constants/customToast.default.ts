import { ToastStateType } from "../components/CustomToast/customToast.types";
import { ToastSeverity } from "../enums/customToast.enums";

export const defaultToastState: ToastStateType = {
  isOpen: false,
  content: "",
  duration: 0,
  severity: ToastSeverity.SUCCESS,
};
