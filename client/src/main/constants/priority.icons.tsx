import React from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { PriorityEnum } from "../enums/priority.enum";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Tooltip } from "@mui/material";

export const getPriorityIcon = (priority: PriorityEnum): React.JSX.Element => {
  switch (priority) {
    case PriorityEnum.High:
      return (
        <Tooltip title="High Priority">
          <NotificationsActiveIcon
            sx={{ fontSize: "18px", color: "red", marginRight: "0px" }}
          />
        </Tooltip>
      );
    case PriorityEnum.Medium:
      return (
        <Tooltip title="Medium Priority">
          <PriorityHighIcon
            sx={{ fontSize: "18px", color: "orange", marginRight: "0px" }}
          />
        </Tooltip>
      );
    case PriorityEnum.Low:
      return (
        <Tooltip title="Low Priority">
          <ArrowDownwardIcon
            sx={{ fontSize: "18px", color: "green", marginRight: "0px" }}
          />
        </Tooltip>
      );
  }
};
