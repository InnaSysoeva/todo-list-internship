import React, { useState, ReactNode } from "react";
import { ConfirmationDialogContext } from "../../context/ConfirmationDialogContext";
import { ConfirmationDialogStateType } from "./confirmationDialog.types";
import { defaultConfirmationDialogState } from "../../constants/confirmationDialog.default";

export const ConfirmationDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<ConfirmationDialogStateType>(
    defaultConfirmationDialogState,
  );

  const openConfirmationDialog = (
    title: string,
    onConfirm: () => void,
  ): void => {
    setDialog({ isOpen: true, title, onConfirm });
  };

  const closeConfirmationDialog = (): void => {
    setDialog(defaultConfirmationDialogState);
  };

  return (
    <ConfirmationDialogContext.Provider
      value={{ dialog, closeConfirmationDialog, openConfirmationDialog }}
    >
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
