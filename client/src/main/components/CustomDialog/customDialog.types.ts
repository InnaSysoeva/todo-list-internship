import { ReactNode } from "react";

export type DialogStateType = {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  onConfirm: () => void;
};

export type DialogContextType = {
  handleCloseDialog: () => void;
  handleOpenDialog: (
    title: string,
    content: ReactNode,
    onConfirm: () => void,
  ) => void;
  dialog: DialogStateType;
};
