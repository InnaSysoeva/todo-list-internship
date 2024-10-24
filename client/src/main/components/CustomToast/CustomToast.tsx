import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useToast } from "../../hooks/useToast";
import CloseIcon from "@mui/icons-material/Close";

export const CustomToast: React.FC = () => {
  const { toast, handleCloseToast } = useToast();

  const handleClose = (): void => {
    handleCloseToast();
  };

  const action = <CloseIcon fontSize="small" onClick={handleClose} />;

  return (
    <Snackbar
      open={toast.isOpen}
      autoHideDuration={toast.duration}
      action={action}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={toast.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toast.content}
      </Alert>
    </Snackbar>
  );
};
