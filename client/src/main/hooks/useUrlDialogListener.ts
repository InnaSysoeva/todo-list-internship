import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const useUrlDialogListener = (onOpenDialog: (id?: string) => void) => {
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.endsWith("/new")) {
      onOpenDialog();
    } else if (id) {
      onOpenDialog(id);
    }
  }, [location, id]);
};

export default useUrlDialogListener;
