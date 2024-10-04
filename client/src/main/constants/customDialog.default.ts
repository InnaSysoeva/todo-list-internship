import { ReactNode } from "react";

export const defaultCustomDialog = {
  isOpen: false,
  title: "",
  content: null as ReactNode,
  onConfirm: () => {},
};
