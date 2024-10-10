import React, { useState } from "react";
import { Chip } from "@mui/material";
import { chipStates } from "../constants/chip.state";

interface TaskStateChipProps {
  initialState: number;
  onStateChange: (newStateIndex: number) => void;
}

export const TaskStateChip: React.FC<TaskStateChipProps> = ({
  initialState,
  onStateChange,
}) => {
  const [stateIndex, setStateIndex] = useState<number>(
    chipStates.findIndex((state) => state.state === initialState),
  );
  const { label, color } = chipStates[stateIndex];

  const handleChipClick = (): void => {
    const newIndex = (stateIndex + 1) % chipStates.length;
    setStateIndex(newIndex);
    onStateChange(chipStates[newIndex].state);
  };

  return (
    <Chip
      label={label}
      color={color}
      onClick={handleChipClick}
      sx={{ width: "95px" }}
      clickable
    />
  );
};
