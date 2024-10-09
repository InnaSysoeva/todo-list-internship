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
import { TaskFormInputType } from "../types/taskFormInput.type";

interface TaskFormProps {
  onSubmit: (data: any) => void;
  initialTask?: TaskFormInputType;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialTask,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInputType>({
    defaultValues: initialTask || {
      title: "",
      description: "",
      dateStart: "",
      dateEnd: "",
      priority: 0,
    },
  });

  const onFormSubmit: SubmitHandler<TaskFormInputType> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          defaultValue={initialTask?.title || ""}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Description"
          {...register("description", { required: "Description is required" })}
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description?.message}
          defaultValue={initialTask?.description || ""}
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
              required: "Date Start is required",
            })}
            error={!!errors.dateStart}
            helperText={errors.dateStart?.message}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={initialTask?.dateStart || ""}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Date End"
            type="date"
            {...register("dateEnd", {
              required: "Date End is required",
            })}
            error={!!errors.dateEnd}
            helperText={errors.dateEnd?.message}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={initialTask?.dateEnd || ""}
          />
        </FormControl>
      </Box>

      <FormControl fullWidth margin="normal">
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          label="Priority"
          {...register("priority", { required: "Priority is required" })}
          defaultValue={initialTask?.priority || ""}
          error={!!errors.priority}
        >
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
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
