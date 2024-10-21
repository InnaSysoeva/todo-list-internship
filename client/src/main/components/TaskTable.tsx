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
  Typography,
  useMediaQuery,
} from "@mui/material";
import { updateTaskState, deleteTask, getTasksByPage } from "../api/taskAPI";
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
import {
  cellWidths,
  tableCellStyles,
} from "../../styles/stylesMUI/tableCell.styles";
import { dateBoxStyles } from "../../styles/stylesMUI/dateBox.styles";
import { CellTaskDataType } from "../types/cellTaskData.type";

export const TaskTable = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [anchorElement, setAnchorElelemt] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const { openConfirmationDialog } = useConfirmationDialog();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const tasksPerPage = 8;

  const fetchTasks: () => Promise<void> = async () => {
    const response = await getTasksByPage(defaultTableParams, tasksPerPage);
    const { totalDocuments, tasks } = response.data;
    setTasks(tasks);
    setPageCount(Math.ceil(totalDocuments / tasksPerPage));
  };

  useEffect(() => {
    fetchTasks();
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

  const handleTaskCreated = (response: { data: TaskType }): void => {
    handleCloseDialog();
    setPageCount(Math.ceil((totalTasks + 1) / tasksPerPage));
    setTasks((prevTasks) => [response.data, ...prevTasks]);
    setTotalTasks((prev) => prev + 1);
  };

  const handleTaskUpdated = (response: { data: TaskType }): void => {
    handleCloseDialog();
    const updatedTask = response.data;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
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
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        setPageCount(Math.ceil((totalTasks - 1) / tasksPerPage));
        setTotalTasks((prev) => prev + 1);
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

    const response = await getTasksByPage(combinedParams, tasksPerPage);
    const { totalDocuments, tasks } = response.data;
    setTasks(tasks);
    setTotalTasks(totalDocuments);
    setPageCount(Math.ceil(totalDocuments / tasksPerPage));

    setTableParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const renderExpandIcon = (taskId: string) => (
    <IconButton onClick={() => handleRowClick(taskId)}>
      {openDescription === taskId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );

  const renderTitle = (title: string) => <Box>{title}</Box>;

  const renderDate = (isSmallScreen: boolean, date: string) =>
    isSmallScreen ? (
      <Box sx={{ display: "none" }}></Box>
    ) : (
      <Chip color="primary" label={date} />
    );

  const renderStateChip = (taskId: string, initialState: number) => (
    <TaskStateChip
      initialState={initialState}
      onStateChange={(newStateIndex: number) =>
        handleStateChange(taskId, newStateIndex)
      }
    />
  );

  const renderActions = (task: TaskType) => (
    <>
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
          onClick={() => selectedTask && handleUpdateTask(selectedTask._id)}
        >
          <EditIcon fontSize="small" /> Update
        </MenuItem>
        <MenuItem
          onClick={() => selectedTask && handleDeleteTask(selectedTask._id)}
        >
          <DeleteIcon fontSize="small" /> Delete
        </MenuItem>
      </Menu>
    </>
  );

  const createTaskCellData = (task: TaskType): CellTaskDataType => {
    return {
      expandIcon: renderExpandIcon(task._id),
      title: renderTitle(task.title),
      dateStart: renderDate(isSmallScreen, task.dateStart),
      dateEnd: renderDate(isSmallScreen, task.dateEnd),
      stateChip: renderStateChip(task._id, task.state),
      actions: renderActions(task),
    };
  };

  return (
    <Box sx={tableBoxStyles}>
      <Box sx={tabsBoxStyles}>
        <CustomTabs
          onFilterClicked={(filter) => handleTableUpdate({ filter })}
        />
        <SearchInputComponent
          onSearchClicked={(search) => handleTableUpdate({ search })}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ backgroundColor: "secondary.main" }}>
          <TableHeader onSortClicked={(sort) => handleTableUpdate({ sort })} />
          <TableBody>
            {tasks.map((task) => {
              const cellData = createTaskCellData(task);
              return (
                <React.Fragment>
                  <TableRow key={task._id}>
                    {Object.values(cellData).map((value, index) => (
                      <TableCell
                        sx={{
                          ...tableCellStyles,
                          width: cellWidths[index],
                          textAlign: index === 1 ? "left" : "center",
                        }}
                        key={index}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Collapse in={openDescription === task._id}>
                        {isSmallScreen && (
                          <Box sx={dateBoxStyles}>
                            <Typography sx={{ fontSize: "14px" }}>
                              Date Start: {task.dateStart}
                            </Typography>
                            <Typography sx={{ fontSize: "14px" }}>
                              Date End: {task.dateEnd}
                            </Typography>
                          </Box>
                        )}
                        <Box
                          sx={{ pl: "10px", pr: "10px", textAlign: "justify" }}
                        >
                          <Typography
                            sx={{
                              fontSize: "15px",
                              mt: "10px",
                              textAlign: "left",
                            }}
                          >
                            Additional Details:
                          </Typography>
                          <Box>{task.description}</Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
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
