import React from "react";
import { useDialog } from "../../hooks/useDialog";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const CustomDialog = () => {
  const { dialog, handleCloseDialog } = useDialog();

  return (
    <Dialog open={dialog.isOpen} onClose={handleCloseDialog}>
      <DialogTitle sx={{ display: "block", margin: "auto" }}>
        {dialog.title}
      </DialogTitle>
      <DialogContent>{dialog.content}</DialogContent>
    </Dialog>
  );
};
