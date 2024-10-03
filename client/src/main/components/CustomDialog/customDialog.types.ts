import { ReactNode } from "react";

export type DialogContent = {
  title: string;
  body: ReactNode;
};

export type DialogState = {
  isOpen: boolean;
  content: DialogContent;
  onConfirm: () => void;
};

export type DialogContextType = {
  handleCloseDialog: () => void;
  handleOpenDialog: (content: DialogContent, onConfirm: () => void) => void;
  dialog: DialogState;
};
