import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { urlRoutes } from "../constants/urlRoutes";

const useUrlDialogListener = (onOpenDialog: (id?: string) => void) => {
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    if (location.pathname.endsWith(urlRoutes.new)) {
      onOpenDialog();
    } else if (id) {
      onOpenDialog(id);
    }
  }, [location, id]);
};

export default useUrlDialogListener;
