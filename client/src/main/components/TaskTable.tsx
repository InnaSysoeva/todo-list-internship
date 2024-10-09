import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Fab,
  Collapse,
} from "@mui/material";
import { CustomPagination } from "./CustomPagination";
import { TaskType } from "../types/task.type";
import { CustomTabs } from "./CustomTabs";
import { TaskStateChip } from "./TaskStateChip";
import { useDialog } from "../hooks/useDialog";
import { TableHeader } from "./TableHeader";
import { getAllTasks, updateTaskState } from "../api/taskAPI";
import { tableBoxStyles } from "../../styles/stylesMUI/tableBox.styles";
import { fabStyles } from "../../styles/stylesMUI/fab.styles";
import { CreateComponent } from "./CreateComponent";
import { UpdateComponent } from "./UpdateComponent";
import useUrlDialogListener from "../hooks/useUrlDialogListener";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";

export const TaskTable = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [anchorElement, setAnchorElelemt] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleOpenDialog, handleCloseDialog } = useDialog();

  const fetchTasks = async () => {
    const response = await getAllTasks();
    const tasksWithId = response.data.map((task: any) => ({
      ...task,
      id: task._id,
    }));
    setTasks(tasksWithId);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleRowClick = (id: string) => {
    setOpenDescription(openDescription === id ? null : id);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    task: TaskType,
  ) => {
    event.stopPropagation();
    setAnchorElelemt(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorElelemt(null);
    setSelectedTask(null);
  };

  const handleTaskCreated = (response: any) => {
    handleCloseDialog();
    const newTask = { ...response.data, id: response.data._id };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (response: any) => {
    handleCloseDialog();
    const updatedTask = response.data;
    const taskWithId = { ...updatedTask, id: updatedTask._id };
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskWithId.id ? taskWithId : task)),
    );
  };

  const handleCreateTask = () => {
    navigate("/new");
  };

  const handleUpdateTask = (id: string) => {
    navigate(`/${id}`);
  };

  const openDialog = (taskId?: string) => {
    if (taskId) {
      handleOpenDialog(
        "Update Task",
        <UpdateComponent onTaskUpdated={handleTaskUpdated} taskId={taskId} />,
      );
    } else {
      handleOpenDialog(
        "Add New Task",
        <CreateComponent onTaskCreated={handleTaskCreated} />,
      );
    }
  };

  useUrlDialogListener(openDialog);

  const handleStateChange = async (taskId: string, newStateIndex: number) => {
    await updateTaskState(taskId, newStateIndex);
  };

  const handleDelete = (id: string) => {
    handleMenuClose();
  };

  return (
    <Box sx={tableBoxStyles}>
      <Box sx={{ width: "100%" }}>
        <CustomTabs />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ height: 470, backgroundColor: "secondary.main" }}>
          <TableHeader />
          <TableBody>
            {tasks.slice(0, 5).map((task) => (
              <React.Fragment>
                <TableRow key={task.id} style={{ cursor: "pointer" }}>
                  <TableCell>
                    <IconButton onClick={() => handleRowClick(task.id)}>
                      {openDescription === task.id ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: 500 }}>{task.title}</TableCell>
                  <TableCell>
                    <TaskStateChip
                      initialState={task.state}
                      onStateChange={(newStateIndex: number) =>
                        handleStateChange(task.id, newStateIndex)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{ ml: "15px" }}
                      color="primary"
                      label={task.dateStart}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{ ml: "10px" }}
                      color="primary"
                      label={task.dateEnd}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ ml: "5px" }}
                      onClick={(event) => handleMenuOpen(event, task)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorElement}
                      open={Boolean(anchorElement)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() =>
                          selectedTask && handleUpdateTask(selectedTask.id)
                        }
                      >
                        <EditIcon fontSize="small" /> Update
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(task.id)}>
                        <DeleteIcon fontSize="small" /> Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ borderTop: "none", paddingBottom: 0, paddingTop: 0 }}
                  >
                    <Collapse
                      in={openDescription === task.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div>
                        <p>{task.description}</p>
                      </div>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination />
      <Fab onClick={handleCreateTask} sx={fabStyles}>
        <AddIcon />
      </Fab>
    </Box>
  );
};
