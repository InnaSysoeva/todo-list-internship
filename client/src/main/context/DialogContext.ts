import { DialogContextType } from "../components/CustomDialog/customDialog.types";
import { createContext } from "react";
import { defaultCustomDialogState } from "../constants/customDialog.default";

export const DialogContext = createContext<DialogContextType>({
  handleCloseDialog: () => {},
  handleOpenDialog: () => {},
  dialog: defaultCustomDialogState,
});
