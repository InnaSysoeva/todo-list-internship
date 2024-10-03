import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  DialogContent,
  DialogState,
  DialogContextType,
} from "./customDialog.types";

const DialogContext = createContext<DialogContextType>({
  handleCloseDialog: () => {},
  handleOpenDialog: () => {},
  dialog: {
    isOpen: false,
    content: {
      title: "",
      body: null,
    },
    onConfirm: () => {},
  },
});

export const useDialog = () => {
  return useContext(DialogContext);
};

export const CustomDialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    content: {
      title: "",
      body: null as ReactNode,
    },
    onConfirm: () => {},
  });

  const handleOpenDialog = (content: DialogContent, onConfirm: () => void) => {
    setDialog({ isOpen: true, content, onConfirm });
  };
  const handleCloseDialog = () => {
    setDialog({
      isOpen: false,
      content: { title: "", body: null },
      onConfirm: () => {},
    });
  };

  return (
    <DialogContext.Provider
      value={{ dialog, handleCloseDialog, handleOpenDialog }}
    >
      {children}
    </DialogContext.Provider>
  );
};
