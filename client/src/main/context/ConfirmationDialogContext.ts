import { createContext } from "react";
import { ConfirmationDialogContextType } from "../components/ConfirmationDialog/confirmationDialog.types";
import { defaultConfirmationDialogState } from "../constants/confirmationDialog.default";

export const ConfirmationDialogContext = createContext<ConfirmationDialogContextType>({
  closeConfirmationDialog: () => {},
  openConfirmationDialog: () => {},
  dialog: defaultConfirmationDialogState,
});
