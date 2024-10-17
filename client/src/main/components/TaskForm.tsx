import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskFormType } from "../types/taskForm.type";
import { defaultTaskFormInput } from "../constants/taskFormInput.default";
import { formErrorMessages } from "../constants/form.messages";
import { PriorityEnum } from "../enums/priority.enum";

interface TaskFormProps {
  onSubmit: (task: TaskFormType) => void;
  initialTask?: TaskFormType;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTask,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormType>({
    defaultValues: initialTask || defaultTaskFormInput,
  });

  const onFormSubmit: SubmitHandler<TaskFormType> = (task) => {
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          {...register("title", {
            required: formErrorMessages.required("Title"),
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Description"
          {...register("description", {
            required: formErrorMessages.required("Description"),
          })}
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </FormControl>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        gap={2}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            label="Date Start"
            type="date"
            {...register("dateStart", {
              required: formErrorMessages.required("Date Start"),
            })}
            error={!!errors.dateStart}
            helperText={errors.dateStart?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Date End"
            type="date"
            {...register("dateEnd", {
              required: formErrorMessages.required("Date End"),
            })}
            error={!!errors.dateEnd}
            helperText={errors.dateEnd?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          label="Priority"
          {...register("priority", {
            required: formErrorMessages.required("Priority"),
          })}
          defaultValue={initialTask?.priority}
          error={!!errors.priority}
        >
          <MenuItem value={PriorityEnum.Low}>Low</MenuItem>
          <MenuItem value={PriorityEnum.Medium}>Medium</MenuItem>
          <MenuItem value={PriorityEnum.High}>High</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{ display: "block", width: "40%", margin: "20px auto" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Confirm
      </Button>
    </form>
  );
};
