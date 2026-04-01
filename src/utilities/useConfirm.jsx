import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
export function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    open: false,
    message: "",
    resolve: null,
  });

  const confirm = (message) => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        message,
        resolve,
      });
    });
  };

  const handleClose = (result) => {
    if (confirmState.resolve) {
      confirmState.resolve(result);
    }
    setConfirmState({ open: false, message: "", resolve: null });
  };

  const ConfirmDialog = () => (
    <Dialog open={confirmState.open} onClose={() => handleClose(false)}>
      <DialogTitle>{confirmState.message}</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button color="error" onClick={() => handleClose(true)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { confirm, ConfirmDialog };
}
