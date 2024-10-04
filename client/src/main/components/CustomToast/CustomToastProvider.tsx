import React, { ReactNode, useState } from "react";
import { ToastContext } from "../../context/ToastContext";
import { ToastStateType } from "./customToast.types";
import { defaultToast } from "../../constants/customToast.default";
import { ToastSeverity } from "../../enums/customToast.enums";

export const CustomToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastStateType>(defaultToast);

  const handleOpenToast = (
    content: string,
    duration: number,
    severity: ToastSeverity,
  ) => {
    setToast({ isOpen: true, content, duration, severity });
  };

  const handleCloseToast = () => {
    setToast((prevToast) => ({
      ...defaultToast,
      severity: prevToast.severity,
    }));
  };

  return (
    <ToastContext.Provider value={{ toast, handleCloseToast, handleOpenToast }}>
      {children}
    </ToastContext.Provider>
  );
};
