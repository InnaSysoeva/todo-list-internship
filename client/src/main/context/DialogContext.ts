import { DialogContextType } from "../components/CustomDialog/customDialog.types";
import { createContext } from "react";
import { defaultCustomDialog } from "../constants/customDialog.default";

export const DialogContext = createContext<DialogContextType>({
  handleCloseDialog: () => {},
  handleOpenDialog: () => {},
  dialog: defaultCustomDialog,
});
