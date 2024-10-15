import React, { useState, ReactNode } from "react";
import { defaultCustomDialogState } from "../../constants/customDialog.default";
import { DialogStateType } from "./customDialog.types";
import { DialogContext } from "../../context/DialogContext";

export const CustomDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<DialogStateType>(
    defaultCustomDialogState,
  );

  const handleOpenDialog = (title: string, content: ReactNode): void => {
    setDialog({ isOpen: true, title, content });
  };

  const handleCloseDialog = (): void => {
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
