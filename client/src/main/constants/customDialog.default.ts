import { ReactNode } from "react";

export const defaultCustomDialogState = {
  isOpen: false,
  title: "",
  content: null as ReactNode,
  onConfirm: () => {},
};
