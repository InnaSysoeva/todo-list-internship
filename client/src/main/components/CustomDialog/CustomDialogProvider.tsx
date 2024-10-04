import React, { useState, ReactNode } from "react";
import { defaultCustomDialogState } from "../../constants/customDialog.default";
import { DialogStateType } from "./customDialog.types";
import { DialogContext } from "../../context/DialogContext";

export const CustomDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<DialogStateType>(defaultCustomDialogState);

  const handleOpenDialog = (
    title: string,
    content: ReactNode,
    onConfirm: () => void,
  ) => {
    setDialog({ isOpen: true, title, content, onConfirm });
  };

  const handleCloseDialog = () => {
    setDialog(defaultCustomDialogState);
  };

  return (
    <DialogContext.Provider
      value={{ dialog, handleCloseDialog, handleOpenDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};
