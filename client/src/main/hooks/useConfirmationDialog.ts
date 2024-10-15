import { useContext } from "react";
import { ConfirmationDialogContextType } from "../components/ConfirmationDialog/confirmationDialog.types";
import { ConfirmationDialogContext } from "../context/ConfirmationDialogContext";

export const useConfirmationDialog = (): ConfirmationDialogContextType => {
  return useContext(ConfirmationDialogContext);
};
