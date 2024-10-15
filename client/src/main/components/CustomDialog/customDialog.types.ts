import { ReactNode } from "react";

export type DialogStateType = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
};

export type DialogContextType = {
  handleCloseDialog: () => void;
  handleOpenDialog: (title: string, content: ReactNode) => void;
  dialog: DialogStateType;
};
