import React from "react";
import { useDialog } from "../../hooks/useDialog";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const CustomDialog = (): JSX.Element => {
  const { dialog, handleCloseDialog } = useDialog();

  return (
    <Dialog
      sx={{ width: "35%", margin: "auto" }}
      open={dialog.isOpen}
      onClose={handleCloseDialog}
    >
      <DialogTitle sx={{ display: "block", margin: "auto" }}>
        {dialog.title}
      </DialogTitle>
      <DialogContent>{dialog.content}</DialogContent>
    </Dialog>
  );
};
