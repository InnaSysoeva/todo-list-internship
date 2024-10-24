import React, { useEffect, useState, useRef } from "react";
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
  Collapse,
  Button,
} from "@mui/material";
import {
  updateTaskState,
  deleteTask,
  getTasksByPage,
  createTasksFromCsvFile,
} from "../api/taskAPI";
import { tableBoxStyles } from "../../styles/stylesMUI/tableBox.styles";
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
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { buttonStyles } from "../../styles/stylesMUI/button.styles";
import {
  cellWidths,
  tableCellStyles,
} from "../../styles/stylesMUI/tableCell.styles";
import { CellTaskDataType } from "../types/cellTaskData.type";
import { CustomToast } from "./CustomToast/CustomToast";
import { useToast } from "../hooks/useToast";
import { ToastSeverity } from "../enums/customToast.enums";
import {
  toastErrorMessages,
  toastSuccessMessages,
} from "../constants/customToast.messages";
import AddTaskIcon from "@mui/icons-material/AddTask";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getPriorityIcon } from "../constants/priority.icons";
import { expandIconStyles } from "../../styles/stylesMUI/expandIcon.styles";
import { buttonBoxStyles } from "../../styles/stylesMUI/buttonBox.styles";
import CircularProgress from "@mui/material/CircularProgress";
import { tableStyles } from "../../styles/stylesMUI/table.styles";
import { buttonIconStyles } from "../../styles/stylesMUI/buttonIcons.styles";

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { handleOpenToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const toastDuration = 10000;
  const tasksPerPage = 10;

  const fetchTasks: () => Promise<void> = async () => {
    try {
      const response = await getTasksByPage(defaultTableParams, tasksPerPage);
      const { totalDocuments, tasks } = response.data;
      setTasks(tasks);
      setPageCount(Math.ceil(totalDocuments / tasksPerPage));
    } catch (error) {
      handleOpenToast(
        toastErrorMessages.internalServerError("fetching tasks"),
        toastDuration,
        ToastSeverity.ERROR,
      );
    } finally {
      setIsLoading(false);
    }
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
    setTasks((prevTasks) => [...prevTasks, response.data]);
    setTotalTasks((prev) => prev + 1);
    handleOpenToast(
      toastSuccessMessages.creation("Task"),
      toastDuration,
      ToastSeverity.SUCCESS,
    );
  };

  const handleTaskUpdated = (response: { data: TaskType }): void => {
    handleCloseDialog();
    const updatedTask = response.data;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
    handleOpenToast(
      toastSuccessMessages.update("Task"),
      toastDuration,
      ToastSeverity.SUCCESS,
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
      try {
        handleOpenDialog(
          "Update Task",
          <UpdateComponent onTaskUpdated={handleTaskUpdated} taskId={taskId} />,
        );
      } catch (error) {
        handleOpenToast(
          toastErrorMessages.update("Task"),
          toastDuration,
          ToastSeverity.ERROR,
        );
      }
    } else {
      try {
        handleOpenDialog(
          "Add New Task",
          <CreateComponent onTaskCreated={handleTaskCreated} />,
        );
      } catch (error) {
        handleOpenToast(
          toastSuccessMessages.creation("Task"),
          toastDuration,
          ToastSeverity.WARNING,
        );
      }
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
        handleOpenToast(
          toastSuccessMessages.deletion("Task"),
          toastDuration,
          ToastSeverity.SUCCESS,
        );
      } catch (error) {
        handleOpenToast(
          toastErrorMessages.deletion("Task"),
          toastDuration,
          ToastSeverity.ERROR,
        );
      }
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

  const handleUploadCsv = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await createTasksFromCsvFile(formData);
        if (tasks.length < tasksPerPage) {
          const updatedTasks = [
            ...tasks,
            ...response.data.slice(0, tasksPerPage),
          ];

          setTasks(updatedTasks);
        }
        setPageCount(
          Math.ceil((totalTasks + response.data.length) / tasksPerPage),
        );
        setTotalTasks((prev) => prev + response.data.length);
        handleOpenToast(
          toastSuccessMessages.creation("Tasks from CSV file"),
          toastDuration,
          ToastSeverity.SUCCESS,
        );
      } catch (error) {
        handleOpenToast(
          toastErrorMessages.internalServerError("parsing uploaded file"),
          toastDuration,
          ToastSeverity.ERROR,
        );
      }
    }
  };

  const renderTitle = (title: string, priority: number, taskId: string) => (
    <Box sx={{ display: "flex", alignItems: "center", padding: "0px" }}>
      <IconButton
        sx={{ padding: "0px" }}
        onClick={() => handleRowClick(taskId)}
      >
        {openDescription === taskId ? (
          <ExpandLessIcon sx={expandIconStyles} />
        ) : (
          <ExpandMoreIcon sx={expandIconStyles} />
        )}
      </IconButton>
      {getPriorityIcon(priority)}
      {title}
    </Box>
  );

  const renderDate = (date: string) => (
    <Box sx={{ fontSize: { xs: "13px", md: "14px" } }}>{date}</Box>
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
        sx={{ padding: "0px" }}
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
      title: renderTitle(task.title, task.priority, task._id),
      dateStart: renderDate(task.dateStart),
      dateEnd: renderDate(task.dateEnd),
      stateChip: renderStateChip(task._id, task.state),
      actions: renderActions(task),
    };
  };

  const renderTasks = () => {
    if (tasks.length === 0 && !isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={cellWidths.length} sx={{ textAlign: "center" }}>
            Not Found
          </TableCell>
        </TableRow>
      );
    } else if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={cellWidths.length} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    } else {
      return tasks.map((task) => {
        const cellData = createTaskCellData(task);
        return (
          <React.Fragment>
            <TableRow key={task._id}>
              {Object.values(cellData).map((value, index) => (
                <TableCell
                  sx={{
                    ...tableCellStyles,
                    width: cellWidths[index],
                    textAlign: index === 0 ? "left" : "center",
                  }}
                  key={index}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse in={openDescription === task._id}>
                  <Box
                    sx={{
                      fontSize: "14px",
                      pl: "10px",
                      pr: "10px",
                      textAlign: "justify",
                    }}
                  >
                    {task.description}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      });
    }
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
        <Box sx={buttonBoxStyles}>
          <Button onClick={handleUploadCsv} sx={buttonStyles}>
            Upload CSV <UploadFileIcon sx={buttonIconStyles} />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".csv"
          />
          <Button onClick={handleCreateTask} sx={buttonStyles}>
            Add New <AddTaskIcon sx={buttonIconStyles} />
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={tableStyles}>
          <TableHeader onSortClicked={(sort) => handleTableUpdate({ sort })} />
          <TableBody>{renderTasks()}</TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        pageCount={pageCount}
        onPageChange={(page) => handleTableUpdate({ page })}
      />
      <ConfirmationDialog />
      <CustomToast />
    </Box>
  );
};
