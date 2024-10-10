export type ConfirmationDialogStateType = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void; 
};

export type ConfirmationDialogContextType = {
  closeConfirmationDialog: () => void;
  openConfirmationDialog: (title: string, onConfirm: () => void) => void;
  dialog: ConfirmationDialogStateType;
};
