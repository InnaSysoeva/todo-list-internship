import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { tabsContainerStyles } from "../../styles/stylesMUI/tabsContainer.styles";
import { tabStyles } from "../../styles/stylesMUI/tab.styles";
import { StateEnum } from "../enums/state.enum";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FiberNewIcon from "@mui/icons-material/FiberNew";

interface TabsProps {
  onFilterClicked: (filter: StateEnum) => void;
}

export const CustomTabs: React.FC<TabsProps> = ({ onFilterClicked }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setTabIndex(newValue);
    onFilterClicked(newValue);
  };

  return (
    <Tabs {...tabsContainerStyles} value={tabIndex} onChange={handleChange}>
      <Tab
        icon={<FormatListBulletedIcon fontSize="small" />}
        iconPosition="start"
        label="All"
        sx={tabStyles}
      />
      <Tab
        icon={<FiberNewIcon fontSize="small" />}
        iconPosition="start"
        label="Active"
        sx={tabStyles}
      />
      <Tab
        icon={<AutorenewIcon fontSize="small" />}
        iconPosition="start"
        label="Pending"
        sx={tabStyles}
      />
      <Tab
        icon={<DoneAllIcon fontSize="small" />}
        iconPosition="start"
        label="Done"
        sx={tabStyles}
      />
    </Tabs>
  );
};
