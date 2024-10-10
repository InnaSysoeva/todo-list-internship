import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { tabsStyles } from "../../styles/stylesMUI/tabs.styles";
import { SxProps, Theme } from '@mui/material';

export const CustomTabs = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabIndex(newValue);
  };

  const getTabStyle = (index: number, tabIndex: number): SxProps<Theme> =>({
    borderBottom: 3,
    borderColor: "primary.main",
    "&.Mui-selected": {
      color: "secondary.dark",
    },
  });

  return (
    <Tabs
      {...tabsStyles}
      variant="fullWidth"
      value={tabIndex}
      onChange={handleChange}
    >
      <Tab label="All" sx={getTabStyle(0, tabIndex)} />
      <Tab label="Active" sx={getTabStyle(1, tabIndex)} />
      <Tab label="In Progress" sx={getTabStyle(2, tabIndex)} />
      <Tab label="Done" sx={getTabStyle(3, tabIndex)} />
    </Tabs>
  );
};
