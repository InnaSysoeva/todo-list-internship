import { ToastSeverity } from "../../enums/customToast.enums";

export type ToastStateType = {
  isOpen: boolean;
  content: string;
  duration: number;
  severity: ToastSeverity;
};

export type ToastContextType = {
  handleCloseToast: () => void;
  handleOpenToast: (
    content: string,
    duration: number,
    severity: ToastSeverity,
  ) => void;
  toast: ToastStateType;
};
