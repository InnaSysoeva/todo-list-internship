import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { useConfirmationDialog } from '../../hooks/useConfirmationDialog';

export const ConfirmationDialog = () => {
    const { dialog, closeConfirmationDialog } = useConfirmationDialog();

    const handleConfirm = (): void => {
        if(dialog.onConfirm) {
            dialog.onConfirm()
        }
        closeConfirmationDialog()
    }

    return (
      <Dialog open={dialog.isOpen} onClose={closeConfirmationDialog} PaperProps={{ sx: { padding: 2 } }}>
        <DialogTitle sx={{ display: "block", margin: "auto"}}>
          {dialog.title}
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 5 }}  onClick={handleConfirm}>Confirm</Button>
            <Button variant="contained" color="primary" onClick={closeConfirmationDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
}
