import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useDialog } from "./CustomDialogProvider";

export const CustomDialog = () => {
  const { dialog, handleCloseDialog } = useDialog();
  const handleConfirm = () => {
    if (dialog.onConfirm) {
      dialog.onConfirm();
    }
    handleCloseDialog();
  };

  return (
    <Dialog open={dialog.isOpen} onClose={handleCloseDialog}>
      <DialogTitle>{dialog.content?.title}</DialogTitle>
      <DialogContent>{dialog.content?.body}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
        <Button onClick={handleConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
