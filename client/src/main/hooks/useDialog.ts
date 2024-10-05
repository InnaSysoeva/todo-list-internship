import { DialogContextType } from "../components/CustomDialog/customDialog.types";
import { useContext } from "react";
import { DialogContext } from "../context/DialogContext";

export const useDialog = (): DialogContextType => {
  return useContext(DialogContext);
};
