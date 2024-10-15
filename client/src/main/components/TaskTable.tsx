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
import {
  updateTaskState,
  deleteTask,
  getTasksByPage,
  getPagesCount,
} from "../api/taskAPI";
import { tableBoxStyles } from "../../styles/stylesMUI/tableBox.styles";
import { fabStyles } from "../../styles/stylesMUI/fab.styles";
import { CreateComponent } from "./CreateComponent";
import { UpdateComponent } from "./UpdateComponent";
import { ConfirmationDialog } from "./ConfirmationDialog/ConfirmationDialog";
import { useConfirmationDialog } from "../hooks/useConfirmationDialog";
import { TableParams } from "../types/tableParams.type";
import { defaultTableParams } from "../constants/tableParams.default";
import { urlRoutes } from "../constants/urlRoutes";
import { confirmationMessages } from "../constants/confirmation.messages";
import { CustomPagination } from "./CustomPagination";
import { TaskType } from "../types/task.type";
import { CustomTabs } from "./CustomTabs";
import { TaskStateChip } from "./TaskStateChip";
import { useDialog } from "../hooks/useDialog";
import { TableHeader } from "./TableHeader";
import { StateEnum } from "../enums/state.enum";
import { SearchInputComponent } from "./SearchInputComponent";
import { tabsBoxStyles } from "../../styles/stylesMUI/tabsBox.styles";
import useUrlDialogListener from "../hooks/useUrlDialogListener";
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";


export const TaskTable = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [anchorElement, setAnchorElelemt] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const { openConfirmationDialog } = useConfirmationDialog();
  const navigate = useNavigate();
  const tasksPerPage = 6;

  const mapTasksWithId = (response: {
    data: Array<Omit<TaskType, "id"> & { _id: string }>;
  }): TaskType[] => {
    return response.data.map(
      (
        task: Omit<TaskType, "id"> & {
          _id: string;
        },
      ) => ({
        ...task,
        id: task._id,
      }),
    );
  };

  const fetchTasks: () => Promise<void> = async () => {
    const response = await getTasksByPage(defaultTableParams, tasksPerPage);
    setTasks(mapTasksWithId(response));
  };

  const fetchPageCount: () => Promise<void> = async () => {
    const response = await getPagesCount();
    setPageCount(Math.ceil(response.data / tasksPerPage));
  };

  useEffect(() => {
    fetchTasks();
    fetchPageCount();
  }, []);

  const handleRowClick = (id: string): void => {
    setOpenDescription(openDescription === id ? null : id);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    task: TaskType,
  ): void => {
    event.stopPropagation();
    setAnchorElelemt(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = (): void => {
    setAnchorElelemt(null);
    setSelectedTask(null);
  };

  const handleTaskCreated = (response: {
    data: Omit<TaskType, "id"> & { _id: string };
  }): void => {
    handleCloseDialog();
    const newTask = { ...response.data, id: response.data._id };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    fetchPageCount();
  };

  const handleTaskUpdated = (response: {
    data: Omit<TaskType, "id"> & { _id: string };
  }): void => {
    handleCloseDialog();
    const updatedTask = response.data;
    const taskWithId = { ...updatedTask, id: updatedTask._id };
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskWithId.id ? taskWithId : task)),
    );
  };

  const handleCreateTask = (): void => {
    navigate(urlRoutes.new);
  };

  const handleUpdateTask = (id: string): void => {
    navigate(urlRoutes.id(id));
  };

  const openDialog = (taskId?: string): void => {
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

  const handleStateChange = async (
    taskId: string,
    newStateIndex: number,
  ): Promise<void> => {
    await updateTaskState(taskId, newStateIndex);
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    handleMenuClose();

    openConfirmationDialog(confirmationMessages.deletion("Task"), async () => {
      try {
        await deleteTask(id);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        fetchPageCount();
      } catch (error) {}
    });
  };

  const handleTableUpdate = async (
    newParams: Partial<TableParams>,
  ): Promise<void> => {
    const prevParams = { ...tableParams };
    const combinedParams = {
      ...prevParams,
      ...newParams,
    };

    setTasks(
      mapTasksWithId(await getTasksByPage(combinedParams, tasksPerPage)),
    );

    if (
      (newParams.filter &&
        Object.values(StateEnum).includes(newParams.filter)) ||
      (newParams.search && newParams.search.trim() !== "")
    ) {
      setPageCount(Math.ceil(tasks.length / tasksPerPage));
    } else {
      fetchPageCount();
    }

    setTableParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  return (
    <Box sx={tableBoxStyles}>
      <Box
        sx={tabsBoxStyles}
      >
        <CustomTabs
          onFilterClicked={(filter) => handleTableUpdate({ filter })}
        />
        <SearchInputComponent
          onSearchClicked={(search) => handleTableUpdate({ search })}
        />
      </Box>
      <TableContainer sx={{ width: 1200 }} component={Paper}>
        <Table sx={{ height: 470, backgroundColor: "secondary.main" }}>
          <TableHeader onSortClicked={(sort) => handleTableUpdate({ sort })} />
          <TableBody>
            {tasks.slice(0, tasksPerPage).map((task) => (
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
                  <TableCell sx={{ width: 600 }}>{task.title}</TableCell>
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
                      <MenuItem
                        onClick={() =>
                          selectedTask && handleDeleteTask(selectedTask.id)
                        }
                      >
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
      <CustomPagination
        pageCount={pageCount}
        onPageChange={(page) => handleTableUpdate({ page })}
      />
      <Fab onClick={handleCreateTask} sx={fabStyles}>
        <AddIcon />
      </Fab>
      <ConfirmationDialog />
    </Box>
  );
};
