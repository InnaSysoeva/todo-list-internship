import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { tabsContainerStyles } from "../../styles/stylesMUI/tabsContainer.styles";
import { tabStyles } from "../../styles/stylesMUI/tab.styles";
import { StateEnum } from "../enums/state.enum";

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
      <Tab label="All" sx={tabStyles} />
      <Tab label="Active" sx={tabStyles} />
      <Tab label="In Progress" sx={tabStyles} />
      <Tab label="Done" sx={tabStyles} />
    </Tabs>
  );
};
