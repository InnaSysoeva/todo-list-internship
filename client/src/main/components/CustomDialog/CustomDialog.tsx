import React from "react";
import { useDialog } from "../../hooks/useDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

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
      <DialogTitle>{dialog.title}</DialogTitle>
      <DialogContent>{dialog.content}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
        <Button onClick={handleConfirm}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
