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
  Chip,
  Fab,
  Collapse,
  Button
} from "@mui/material";
import {
  updateTaskState,
  deleteTask,
  getTasksByPage,
  createTasksFromCsvFile
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
import { tableCellStyles } from "../../styles/stylesMUI/tableCellStyles";
import { uploadCsvButtonStyles } from "../../styles/stylesMUI/uploadCsvButton.styles";


export const TaskTable = (): JSX.Element => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [anchorElement, setAnchorElelemt] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0)
  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams);
  const { handleOpenDialog, handleCloseDialog } = useDialog();
  const { openConfirmationDialog } = useConfirmationDialog();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tasksPerPage = 8;

  const fetchTasks: () => Promise<void> = async () => {
    const response = await getTasksByPage(defaultTableParams, tasksPerPage);
    const {totalDocuments, tasks} = response.data;
    setTasks(tasks);
    setPageCount(Math.ceil(totalDocuments/tasksPerPage));
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

  const handleTaskCreated = (response: {data: TaskType}): void => {
    handleCloseDialog();
    setPageCount(Math.ceil((totalTasks + 1)/tasksPerPage))
    setTasks((prevTasks) => [...prevTasks, response.data]);
    setTotalTasks(prev => prev + 1)
  };

  const handleTaskUpdated = (response: {data: TaskType}): void => {
    handleCloseDialog();
    const updatedTask = response.data;
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
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
        setPageCount(Math.ceil((totalTasks - 1)/tasksPerPage))
        setTotalTasks(prev => prev + 1)
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

    const response = await getTasksByPage(combinedParams, tasksPerPage)
    const {totalDocuments, tasks} = response.data;
    setTasks(tasks);
    setTotalTasks(totalDocuments);
    setPageCount(Math.ceil(totalDocuments/tasksPerPage));

    setTableParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleUploadCsv = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      const response = await createTasksFromCsvFile(formData);
      if (tasks.length < tasksPerPage) {
        const updatedTasks = [...tasks, ...response.data.slice(0, tasksPerPage)];
        setTasks(updatedTasks);
      }
      setPageCount(Math.ceil((totalTasks + response.data.length)/tasksPerPage));
      setTotalTasks(prev => prev + response.data.length)
    }
  };

  const createTaskCellData = (task: TaskType) => ({
      expandIcon: (
        <IconButton onClick={() => handleRowClick(task._id)}>
          {openDescription === task._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      ),
      title: ( <Box>{task.title}</Box> ),
      dateStart: (
        <Chip color="primary" label={task.dateStart} />
      ),
      dateEnd: (
        <Chip color="primary" label={task.dateEnd} />
      ),
      stateChip: (
        <TaskStateChip
          initialState={task.state}
          onStateChange={(newStateIndex: number) => handleStateChange(task._id, newStateIndex)}
        />
      ),
      actions: (
        <React.Fragment>
          <IconButton sx={{ ml: "5px" }} onClick={(event) => handleMenuOpen(event, task)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElement}
            open={Boolean(anchorElement)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => selectedTask && handleUpdateTask(selectedTask._id)}>
              <EditIcon fontSize="small" /> Update
            </MenuItem>
            <MenuItem onClick={() => selectedTask && handleDeleteTask(selectedTask._id)}>
              <DeleteIcon fontSize="small" /> Delete
            </MenuItem>
          </Menu>
        </React.Fragment>
      ),
  });

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
        <Button onClick={handleUploadCsv} sx={uploadCsvButtonStyles}>Add from CSV</Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{display: 'none'}} 
          onChange={handleFileChange} 
          accept=".csv"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{height: "450px", backgroundColor: "secondary.main" }}>
          <TableHeader onSortClicked={(sort) => handleTableUpdate({ sort })} />
          <TableBody>
            {tasks.map((task) => {
              const cellData = createTaskCellData(task); 
              return (
                <React.Fragment>
                  <TableRow key={task._id}>
                      {Object.values(cellData).map((value, index) => (
                        <TableCell sx={tableCellStyles} key={index}>{value}</TableCell>
                      ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} sx={{paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={openDescription === task._id}>
                         <Box>{task.description}</Box>
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
